<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
	<xsl:template name="nav">
		<nav id="mastnav" aria-label="Main Navigation"> 
			<a class="visuallyhidden" href="#nav">Skip to section navigation</a>
			<xsl:call-template name="mast-nav" />
		</nav>	
	</xsl:template>

</xsl:stylesheet>
