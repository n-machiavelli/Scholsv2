<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
    <xsl:output method="xml" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"  />
    <xsl:include href="nivo.xsl" />
	
	<xsl:template match="/">
		
		<xsl:call-template name="nivo" />
		
	</xsl:template>

</xsl:stylesheet>
