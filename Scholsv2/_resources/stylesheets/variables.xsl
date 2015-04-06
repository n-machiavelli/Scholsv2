<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"
    exclude-result-prefixes="ou">
    
    	<!-- OU and Helper Variables -->
    	
	<xsl:param name="ou:site" />
	<xsl:param name="ou:filename" />
	<xsl:param name="ou:dirname" />
	<xsl:param name="ou:action" />
	<xsl:param name="ou:path" />
	<xsl:param name="ou:root" />
	<xsl:param name="ou:httproot" />
	
	<xsl:variable name="datetime" select="current-dateTime()" />
	
	<xsl:variable name="navigation-xml" select="doc('../navigation/navigation.xml')/navigation" />
	<xsl:variable name="site-definition" select="doc('../site_definition.xml')/site_definitions" />
	<xsl:variable name="config" select="document/config" />

	
	<!-- Core Variables -->
	
	<xsl:variable name="site-title">
		<xsl:value-of select="$site-definition/site_title" />
	</xsl:variable>
	
	<xsl:variable name="site-status">
		<xsl:value-of select="$site-definition/site_status" />
	</xsl:variable>

	<xsl:variable name="page-title">
		<xsl:variable name="temp-title" select="normalize-space($config/title)" />
		<xsl:if test="$temp-title != ''">
				<xsl:choose>
					<xsl:when test="$extension='php' and matches($temp-title,'^\$')">
						<xsl:processing-instruction name="php">echo <xsl:value-of select="$temp-title" disable-output-escaping="yes"/>; </xsl:processing-instruction><xsl:value-of select="' | '" />
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$temp-title" /><xsl:value-of select="' | '" /></xsl:otherwise>
				</xsl:choose>		
			</xsl:if>
			<xsl:value-of select="$site-title" />
	</xsl:variable>

	<xsl:variable name="page-section">
		<xsl:value-of select="replace(replace($ou:dirname,'^/(.+?)(/|$).*','$1'),'( |_)','-')" />
	</xsl:variable>
	
	<xsl:variable name="page-layout">
		<xsl:value-of select="$config/parameter[@name='page-layout']/option[@selected='true']/@value" />
	</xsl:variable>
	
	<xsl:variable name="intro-layout">
		<xsl:choose>
			<xsl:when test="$config/parameter[@name='intro-layout']/option[@selected='true']/@value != 'none'">
				<xsl:value-of select="$config/parameter[@name='intro-layout']/option[@selected='true']/@value" />
			</xsl:when>
			<xsl:otherwise><xsl:value-of select="''"/></xsl:otherwise>
		</xsl:choose> 
	</xsl:variable>
	
	<!-- Optional Variables -->
	
	<xsl:variable name="giving">
		<xsl:value-of select="$config/parameter[@name='giving']/option/@selected" />
	</xsl:variable>
	
	<xsl:variable name="sub-mast">
		<xsl:value-of select="$config/parameter[@name='sub-mast']/option/@selected" />
	</xsl:variable>
	
	<xsl:variable name="page-tools">
		<xsl:value-of select="$config/parameter[@name='page-tools']/option/@selected" />
	</xsl:variable>
	
	<xsl:variable name="feedback">
		<xsl:value-of select="$config/parameter[@name='feedback']/option/@selected" />
	</xsl:variable>
	
	<!-- Option Box Variables -->
	
	<xsl:variable name="optbox1-show">
		<xsl:value-of select="$config/parameter[@name='optbox1-show']/option/@selected" />
	</xsl:variable>
	
	<xsl:variable name="optbox1-style">
		<xsl:call-template name="optionbox_style">
			<xsl:with-param name="val" select="$config/parameter[@name='optbox1-style']/option[@selected='true']/@value" />
		</xsl:call-template>
	</xsl:variable>
	
	<xsl:variable name="optbox2-show">
		<xsl:value-of select="$config/parameter[@name='optbox2-show']/option/@selected" />
	</xsl:variable>
	
	<xsl:variable name="optbox2-style">
		<xsl:call-template name="optionbox_style">
			<xsl:with-param name="val" select="$config/parameter[@name='optbox2-style']/option[@selected='true']/@value" />
		</xsl:call-template>
	</xsl:variable>
	
	<xsl:variable name="optbox3-show">
		<xsl:value-of select="$config/parameter[@name='optbox3-show']/option/@selected" />
	</xsl:variable>
	
	<xsl:variable name="optbox3-style">
		<xsl:call-template name="optionbox_style">
			<xsl:with-param name="val" select="$config/parameter[@name='optbox3-style']/option[@selected='true']/@value" />
		</xsl:call-template>
	</xsl:variable>
	
	<xsl:variable name="optbox4-show">
		<xsl:value-of select="$config/parameter[@name='optbox4-show']/option/@selected" />
	</xsl:variable>
	
	<xsl:variable name="optbox4-style">
		<xsl:call-template name="optionbox_style">
			<xsl:with-param name="val" select="$config/parameter[@name='optbox4-style']/option[@selected='true']/@value" />
		</xsl:call-template>
	</xsl:variable>
	
	<xsl:template name="optionbox_style">
		<xsl:param name="val" />
		<xsl:choose>
			<xsl:when test="$val = '' or contains($val,'none')"><xsl:value-of select="''"/></xsl:when>
			<xsl:otherwise><xsl:value-of select="substring-before($val,'_ob')" /></xsl:otherwise>
		</xsl:choose> 
	</xsl:template>
		
	<!-- Responsive Variables -->
		
	<xsl:variable name="callout-resp">
		<xsl:value-of select="lower-case($config/parameter[@name='callout-resp']/option[@selected='true'])" />
	</xsl:variable>
		
	<xsl:variable name="sub-mast-resp">
		<xsl:value-of select="$config/parameter/option[@value='sub-mast-resp']/@selected" />
	</xsl:variable>
		
	<xsl:variable name="sub-content-resp">
		<xsl:value-of select="$config/parameter/option[@value='sub-content-resp']/@selected" />
	</xsl:variable>
		
	<xsl:variable name="split-intro-resp">
		<xsl:value-of select="$config/parameter/option[@value='split-intro-resp']/@selected" />
	</xsl:variable>
	
	<!-- Admin Variables -->
	
	<xsl:variable name="section-nav">
		<xsl:value-of select="$config/parameter[@name='section-nav']/option/@selected" />
	</xsl:variable>
	
	<xsl:variable name="sub-section-nav">
		<xsl:value-of select="$config/parameter[@name='sub-section-nav']/option/@selected" />
	</xsl:variable>
	
	<xsl:variable name="sub-content">
		<xsl:value-of select="$config/parameter[@name='sub-content']/option/@selected" />
	</xsl:variable>

	<xsl:variable name="search-box">
		<xsl:value-of select="$config/parameter[@name='search-box']/option/@selected" />
	</xsl:variable>
	
	<!-- Designer and Level 10 Variables -->
	
	<xsl:variable name="template">
		<xsl:choose>
			<xsl:when test="$config/template != ''">
				<xsl:value-of select="$config/template" />
			</xsl:when>
			<xsl:otherwise>standard</xsl:otherwise>
		</xsl:choose> 
	</xsl:variable>
	
	<xsl:variable name="extension">
		<xsl:choose>
			<xsl:when test="$config/template/@ext != ''">
				<xsl:value-of select="$config/template/@ext" />
			</xsl:when>
			<xsl:otherwise>shtml</xsl:otherwise>
		</xsl:choose> 
	</xsl:variable>
	
	<!-- Template Helper Variables -->
	
	<xsl:variable name="section-nav-class">
		<xsl:choose><xsl:when test="$section-nav='true'">sectionnavon</xsl:when><xsl:otherwise>sectionnavoff</xsl:otherwise></xsl:choose>
	</xsl:variable>
	
	<xsl:variable name="html-class-build">
		<xsl:choose>
			<xsl:when test="$site-status='0'"></xsl:when>
			<xsl:when test="$site-status='1'">pre-production</xsl:when>
			<xsl:otherwise>development</xsl:otherwise>
		</xsl:choose>
		
		<xsl:value-of select="concat(' ',$template)" />
		
		<xsl:if test="$search-box='false'"><xsl:value-of select=' searchboxoff' /></xsl:if>

		<xsl:choose>
			<xsl:when test="$page-section='/' or $page-section=''"> sec-home</xsl:when>
			<xsl:otherwise><xsl:value-of select="replace(concat(' sec-',normalize-space($page-section)),'--','-')"/></xsl:otherwise>
		</xsl:choose>

		<xsl:value-of select="concat(' page-',substring(lower-case(replace(replace($ou:filename,'( |-|_)','-'),'\.(php|shtml)','')),1,25))" />
		
		<xsl:if test="$search-box = 'false'"> searchboxoff</xsl:if>
		
		<xsl:if test="$sub-mast-resp = 'false'"> sub-mast-resp</xsl:if>
		
		<xsl:if test="$sub-content-resp = 'false'"> sub-content-resp</xsl:if>
		
		<xsl:if test="$split-intro-resp = 'false'"> split-intro-resp</xsl:if>
		
		<xsl:variable name="folder-lvl"><xsl:value-of select="(string-length($ou:path)-string-length(replace($ou:path,'/','')))-1" /></xsl:variable>
		<xsl:choose>
			<xsl:when test="$folder-lvl=0"> folder-root</xsl:when>
			<xsl:otherwise> folder-lvl<xsl:value-of select="$folder-lvl" /></xsl:otherwise>
		</xsl:choose>
		
		
	</xsl:variable>

	<xsl:variable name="html-class" select="normalize-space($html-class-build)" />
	
	<xsl:variable name="intro-offset">
		<xsl:choose>
			<xsl:when test="$intro-layout='intro'">1</xsl:when>
			<xsl:when test="$intro-layout='split'">2</xsl:when>
			<xsl:otherwise>0</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	
	<xsl:variable name="status-path">
		<xsl:choose>
			<xsl:when test="contains($ou:dirname,'_design')">/</xsl:when>
			<xsl:when test="$site-status='2'">/_isu/</xsl:when>		
			<xsl:otherwise>/</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	
	<!-- File Include Paths -->
	
	<xsl:variable name="override" select="$config/page-include-override" />
	<xsl:variable name="include-path" select="concat('/_resources/includes',$status-path)" />

	<xsl:variable name="meta-include">
		<xsl:call-template name="file-include-path">
			<xsl:with-param name="path" select="$override/meta" />
			<xsl:with-param name="file" select="'meta.html'" />
		</xsl:call-template>
	</xsl:variable>
	
	<xsl:variable name="css-include">
		<xsl:call-template name="file-include-path">
			<xsl:with-param name="path" select="$override/css" />
			<xsl:with-param name="file" select="'site_css.html'" />
		</xsl:call-template>
	</xsl:variable>
	
	<xsl:variable name="head-btm-include">
		<xsl:call-template name="file-include-path">
			<xsl:with-param name="path" select="$override/before_closing_head" />
			<xsl:with-param name="file" select="'before_closing_head.html'" />
		</xsl:call-template>
	</xsl:variable>
	
	<xsl:variable name="header-include">
		<xsl:call-template name="file-include-path">
			<xsl:with-param name="path" select="$override/header" />
			<xsl:with-param name="file" select="'header.html'" />
		</xsl:call-template>
	</xsl:variable>
	
	<xsl:variable name="footer-include">
		<xsl:call-template name="file-include-path">
			<xsl:with-param name="path" select="$override/footer" />
			<xsl:with-param name="file" select="'footer.html'" />
		</xsl:call-template>
	</xsl:variable>
	
	<xsl:variable name="body-btm-include">
		<xsl:call-template name="file-include-path">
			<xsl:with-param name="path" select="$override/before_closing_body" />
			<xsl:with-param name="file" select="'before_closing_body.html'" />
		</xsl:call-template>
	</xsl:variable>
	
	<xsl:variable name="giving-include">
		<xsl:call-template name="file-include-path">
			<xsl:with-param name="path" select="$override/giving" />
			<xsl:with-param name="file" select="'giving.html'" />
		</xsl:call-template>
	</xsl:variable>
	
	<xsl:variable name="subsectionnav-include">
		<xsl:call-template name="file-include-path">
			<xsl:with-param name="path" select="$override/subsectionnav" />
			<xsl:with-param name="file" select="'subsectionnav.html'" />
		</xsl:call-template>
	</xsl:variable>
	
	<xsl:variable name="page_tools-include">
		<xsl:call-template name="file-include-path">
			<xsl:with-param name="path" select="$override/page_tools" />
			<xsl:with-param name="file" select="'page_tools.html'" />
		</xsl:call-template>
	</xsl:variable>
	
	<xsl:variable name="feedback-include">
		<xsl:call-template name="file-include-path">
			<xsl:with-param name="path" select="$override/feedback" />
			<xsl:with-param name="file" select="'feedback.html'" />
		</xsl:call-template>
	</xsl:variable>
	
	<xsl:template name="file-include-path">
		<xsl:param name="path" />
		<xsl:param name="file" />
		<xsl:choose>
			<xsl:when test="$path != ''"><xsl:value-of select="$path" /></xsl:when>
			<xsl:otherwise><xsl:value-of select="concat($include-path,$file)" /></xsl:otherwise>
		</xsl:choose> 
	</xsl:template>
	
</xsl:stylesheet>
