<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
	<xsl:template name="sub_content">
		<xsl:if test="$sub-content='true'">
			<section id="subcontent">
				<span class="subcontent_top"><xsl:comment>Top</xsl:comment></span>
				<div class="subcontent_mid"><xsl:copy-of select="document/sub-content-content/node()" /></div>
				<span class="subcontent_btm"><xsl:comment>Bottom</xsl:comment></span>
			</section>
		</xsl:if>
	</xsl:template>

</xsl:stylesheet>
