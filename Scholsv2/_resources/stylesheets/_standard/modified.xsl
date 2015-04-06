<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
	<xsl:template name="modified">
		<div id="ou_modified">
			<span id="m_datetime"><xsl:value-of select="$datetime" /></span>
			<span id="m_year"><xsl:value-of select="year-from-dateTime($datetime)" /></span>
		</div>
	</xsl:template>

</xsl:stylesheet>
