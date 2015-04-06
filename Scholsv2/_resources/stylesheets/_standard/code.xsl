<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
	<xsl:template name="code">
		<xsl:if test="$extension='php'" >
			<xsl:if test="child::text()[normalize-space(document/code)] | child::* != ''">
				<xsl:copy-of select="document/code/node()" />
			</xsl:if>
		</xsl:if>
	</xsl:template>

</xsl:stylesheet>
