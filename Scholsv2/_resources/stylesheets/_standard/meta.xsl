<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
	<xsl:template name="meta">
		<meta charset="utf-8" />	
		<title><xsl:copy-of select="$page-title" /></title>
		<meta name="OU-template" content="v3.0" />
		<meta name="OU-minor-version" content="3" />
		<meta name="date">
			<xsl:attribute name="content"><xsl:value-of select="concat(year-from-dateTime($datetime),'-',month-from-dateTime($datetime),'-',day-from-dateTime($datetime))" /></xsl:attribute>
		</meta>
		<xsl:call-template name="render-include">
			<xsl:with-param name="path" select="$meta-include" />
			<xsl:with-param name="label" select="'meta-include'" />
		</xsl:call-template>
		<xsl:for-each select="document/config/meta[normalize-space(@content)!='']">
			<xsl:copy-of select="." />
		</xsl:for-each>
	</xsl:template>

</xsl:stylesheet>
