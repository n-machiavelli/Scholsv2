<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
	<xsl:template name="body_content">
		<div id="body">
			
			<xsl:variable name="callout-location-class">
				<xsl:if test="$page-layout='callout'">	
					<xsl:choose>
						<xsl:when test="$callout-resp='bottom'">resp_btm</xsl:when>
						<xsl:otherwise>resp_top</xsl:otherwise>
					</xsl:choose>
				</xsl:if>
			</xsl:variable>
			
			<xsl:attribute name="class"><xsl:value-of select="normalize-space(concat($page-layout,' ',$intro-layout,' ',$section-nav-class,' ',$callout-location-class))" /></xsl:attribute>
			<xsl:call-template name="content-render" />
		</div>
	</xsl:template>

</xsl:stylesheet>
