<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
	<xsl:template name="iguide">
		<a class="visuallyhidden" href="#body">Skip to main content</a>
		<nav role="navigation" aria-label="University Navigation">
			<script type="text/javascript" src="//iguides.illinoisstate.edu"><xsl:comment>SCRIPT</xsl:comment></script>
			<xsl:if test="$ou:action = 'pub'">
				<xsl:copy-of select="doc('http://iguides.illinoisstate.edu/iguide.html')" />
			</xsl:if>
		</nav>
	</xsl:template>

</xsl:stylesheet>
