<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
	<xsl:template name="footer">
		<footer role="contentinfo">
			<xsl:comment>googleoff: snippet</xsl:comment>
			<xsl:call-template name="render-include">
				<xsl:with-param name="path" select="$footer-include" />
				<xsl:with-param name="label" select="'footer-include'" />
			</xsl:call-template>
		</footer>
	</xsl:template>

</xsl:stylesheet>
