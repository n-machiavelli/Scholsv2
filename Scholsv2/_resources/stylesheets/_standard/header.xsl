<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
	<xsl:template name="header">
		<header role="banner">
			<a class="visuallyhidden" href="#mastnav">Skip to main navigation</a>
			<xsl:call-template name="render-include">
				<xsl:with-param name="path" select="$header-include" />
				<xsl:with-param name="label" select="'header-include'" />
			</xsl:call-template>
		</header> 
	</xsl:template>

</xsl:stylesheet>
