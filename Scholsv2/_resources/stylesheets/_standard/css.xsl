<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
	<xsl:template name="css">
		
		<xsl:call-template name="render-include">
			<xsl:with-param name="path" select="$css-include" />
			<xsl:with-param name="label" select="'css-include'" />
		</xsl:call-template>
		
		<xsl:if test="child::text()[normalize-space(document/css)] | child::* != ''">
			<xsl:copy-of select="document/css/node()" />
		</xsl:if>
		
		<xsl:if test="$ou:action != 'pub'">
			<link id="dev_css" href="//cdn.illinoisstate.edu/css/ou/dev-tools.css" rel="stylesheet" media="screen" type="text/css" />
		</xsl:if>
	</xsl:template>

</xsl:stylesheet>
