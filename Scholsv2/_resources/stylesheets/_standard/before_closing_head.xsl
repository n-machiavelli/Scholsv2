<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
	<xsl:template name="before_closing_head">
		<xsl:call-template name="render-include">
			<xsl:with-param name="path" select="$head-btm-include" />
			<xsl:with-param name="label" select="'head-btm-include'" />
		</xsl:call-template>
		<xsl:if test="child::text()[normalize-space(document/before-closing-head)] | child::* != ''">
			<xsl:copy-of select="document/before-closing-head/node()" />
		</xsl:if>	
	</xsl:template>

</xsl:stylesheet>
