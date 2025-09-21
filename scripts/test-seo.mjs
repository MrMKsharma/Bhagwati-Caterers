#!/usr/bin/env node

/**
 * SEO Testing Utility for Elite Caterers
 * 
 * This script validates various SEO aspects of the website
 * Run with: node scripts/test-seo.js
 */

import https from 'https';
import http from 'http';

class SEOTester {
  constructor(baseUrl = 'http://localhost:3004') {
    this.baseUrl = baseUrl;
    this.results = {
      sitemap: { status: 'pending', details: null },
      robots: { status: 'pending', details: null },
      pages: {},
      structuredData: { status: 'pending', details: [] },
      overall: { score: 0, passed: 0, total: 0 }
    };
  }

  async testSitemap() {
    console.log('🗺️  Testing sitemap.xml...');
    try {
      const content = await this.fetchContent('/sitemap.xml');
      
      if (content.includes('<?xml') && content.includes('<urlset')) {
        const urlCount = (content.match(/<url>/g) || []).length;
        this.results.sitemap = {
          status: 'passed',
          details: `Valid XML sitemap with ${urlCount} URLs`
        };
        console.log(`   ✅ Sitemap valid with ${urlCount} URLs`);
      } else {
        this.results.sitemap = {
          status: 'failed',
          details: 'Invalid sitemap format'
        };
        console.log('   ❌ Invalid sitemap format');
      }
    } catch (error) {
      this.results.sitemap = {
        status: 'failed',
        details: `Error: ${error.message}`
      };
      console.log(`   ❌ Sitemap error: ${error.message}`);
    }
  }

  async testRobots() {
    console.log('🤖 Testing robots.txt...');
    try {
      const content = await this.fetchContent('/robots.txt');
      
      const hasUserAgent = content.includes('User-agent:');
      const hasSitemap = content.includes('Sitemap:');
      // const hasDisallow = content.includes('Disallow:'); // Not currently used
      
      if (hasUserAgent && hasSitemap) {
        this.results.robots = {
          status: 'passed',
          details: `Valid robots.txt with sitemap reference`
        };
        console.log('   ✅ Robots.txt is properly configured');
      } else {
        this.results.robots = {
          status: 'failed',
          details: 'Missing required directives'
        };
        console.log('   ❌ Robots.txt missing required directives');
      }
    } catch (error) {
      this.results.robots = {
        status: 'failed',
        details: `Error: ${error.message}`
      };
      console.log(`   ❌ Robots.txt error: ${error.message}`);
    }
  }

  async testPageSEO(path, pageName) {
    console.log(`📄 Testing ${pageName} page...`);
    try {
      const content = await this.fetchContent(path);
      
      const tests = {
        title: this.hasValidTitle(content),
        description: this.hasMetaDescription(content),
        openGraph: this.hasOpenGraphTags(content),
        structuredData: this.hasStructuredData(content),
        canonical: this.hasCanonicalUrl(content)
      };
      
      const passed = Object.values(tests).filter(Boolean).length;
      const total = Object.keys(tests).length;
      
      this.results.pages[pageName] = {
        status: passed === total ? 'passed' : 'partial',
        score: `${passed}/${total}`,
        details: tests
      };
      
      console.log(`   📊 SEO Score: ${passed}/${total}`);
      Object.entries(tests).forEach(([test, result]) => {
        console.log(`   ${result ? '✅' : '❌'} ${test}`);
      });
      
    } catch (error) {
      this.results.pages[pageName] = {
        status: 'failed',
        details: `Error: ${error.message}`
      };
      console.log(`   ❌ Page error: ${error.message}`);
    }
  }

  hasValidTitle(content) {
    const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (!titleMatch) return false;
    
    const title = titleMatch[1].trim();
    return title.length >= 30 && title.length <= 60 && title.includes('Elite Caterers');
  }

  hasMetaDescription(content) {
    const descMatch = content.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    if (!descMatch) return false;
    
    const description = descMatch[1].trim();
    return description.length >= 120 && description.length <= 160;
  }

  hasOpenGraphTags(content) {
    const ogTitle = content.includes('property="og:title"');
    const ogDesc = content.includes('property="og:description"');
    const ogImage = content.includes('property="og:image"');
    return ogTitle && ogDesc && ogImage;
  }

  hasStructuredData(content) {
    return content.includes('application/ld+json') && content.includes('@context');
  }

  hasCanonicalUrl(content) {
    return content.includes('rel="canonical"');
  }

  async fetchContent(path) {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}${path}`;
      const client = url.startsWith('https:') ? https : http;
      
      client.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve(data);
          } else {
            reject(new Error(`HTTP ${res.statusCode}`));
          }
        });
      }).on('error', reject);
    });
  }

  async runAllTests() {
    console.log('🚀 Starting SEO Tests for Elite Caterers\n');
    
    // Test core SEO files
    await this.testSitemap();
    await this.testRobots();
    
    console.log('');
    
    // Test individual pages
    const pages = [
      ['/', 'Home'],
      ['/about', 'About'],
      ['/services', 'Services'],
      ['/menu', 'Menu'],
      ['/packages', 'Packages'],
      ['/gallery', 'Gallery'],
      ['/contact', 'Contact']
    ];
    
    for (const [path, name] of pages) {
      await this.testPageSEO(path, name);
      console.log('');
    }
    
    // Calculate overall score
    this.calculateOverallScore();
    this.displaySummary();
  }

  calculateOverallScore() {
    const sitemapScore = this.results.sitemap.status === 'passed' ? 1 : 0;
    const robotsScore = this.results.robots.status === 'passed' ? 1 : 0;
    
    let pagesPassed = 0;
    let pagesTotal = Object.keys(this.results.pages).length;
    
    Object.values(this.results.pages).forEach(page => {
      if (page.status === 'passed') pagesPassed++;
    });
    
    const totalPassed = sitemapScore + robotsScore + pagesPassed;
    const totalTests = 2 + pagesTotal; // sitemap + robots + pages
    
    this.results.overall = {
      score: Math.round((totalPassed / totalTests) * 100),
      passed: totalPassed,
      total: totalTests
    };
  }

  displaySummary() {
    console.log('📊 SEO TEST SUMMARY');
    console.log('==================');
    console.log(`Overall Score: ${this.results.overall.score}%`);
    console.log(`Tests Passed: ${this.results.overall.passed}/${this.results.overall.total}`);
    console.log('');
    
    console.log('Core SEO:');
    console.log(`  Sitemap: ${this.results.sitemap.status === 'passed' ? '✅' : '❌'}`);
    console.log(`  Robots: ${this.results.robots.status === 'passed' ? '✅' : '❌'}`);
    console.log('');
    
    console.log('Page SEO:');
    Object.entries(this.results.pages).forEach(([page, result]) => {
      const icon = result.status === 'passed' ? '✅' : result.status === 'partial' ? '⚠️' : '❌';
      console.log(`  ${page}: ${icon} ${result.score || 'failed'}`);
    });
    
    console.log('');
    
    if (this.results.overall.score >= 90) {
      console.log('🎉 Excellent! Your SEO implementation is outstanding.');
    } else if (this.results.overall.score >= 75) {
      console.log('👍 Good! Your SEO implementation is solid with room for minor improvements.');
    } else if (this.results.overall.score >= 50) {
      console.log('⚠️  Fair. Your SEO implementation needs some improvements.');
    } else {
      console.log('❌ Poor. Your SEO implementation needs significant work.');
    }
  }
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new SEOTester();
  tester.runAllTests().catch(console.error);
}

export default SEOTester;