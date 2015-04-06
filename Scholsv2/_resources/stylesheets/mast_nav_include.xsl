<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"
    exclude-result-prefixes="ou">
   
    <xsl:output method="xml" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"  />
    
	<xsl:include href="_standard/nav.xsl" />
    <xsl:include href="_standard/mast_nav.xsl" />
    <xsl:include href="variables.xsl" />
	
	<xsl:template match="/" xml:space="preserve">
		<xsl:call-template name="nav" />
	</xsl:template>

</xsl:stylesheet>
