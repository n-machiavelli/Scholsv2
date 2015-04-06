<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
	<xsl:template name="sub_mast">
		<xsl:if test="$sub-mast='true'">
			<section id="submast">
				<span class="submast_top"><xsl:comment>Top</xsl:comment></span>
				<div class="submast_mid">
					<xsl:copy-of select="document/sub-mast-content/node()" />
				</div>
				<span class="submast_btm"><xsl:comment>Bottom</xsl:comment></span>
			</section>
		</xsl:if>
	</xsl:template>

</xsl:stylesheet>
