<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
    <xsl:output method="xml" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"  />
	
	<xsl:template name="content-render">	
	
		<span class="body_top"><xsl:comment>Top</xsl:comment></span>		
		
		<div id="wrapcontent">
			
			<xsl:choose>
				<xsl:when test="$page-layout='basic'"><xsl:call-template name="layout_basic" /></xsl:when>
				<xsl:when test="$page-layout='callout'"><xsl:call-template name="layout_callout" /></xsl:when>
				<xsl:when test="$page-layout='sidebar'"><xsl:call-template name="layout_sidebar" /></xsl:when>
				<xsl:when test="$page-layout='optionbox'"><xsl:call-template name="layout_optionbox" /></xsl:when>
				<xsl:when test="$page-layout='twocol'"><xsl:call-template name="layout_twocol" /></xsl:when>
				<xsl:when test="$page-layout='threecol'"><xsl:call-template name="layout_threecol" /></xsl:when>
				<xsl:when test="$page-layout='custom1'"><xsl:call-template name="layout_custom1" /></xsl:when>
				<xsl:when test="$page-layout='custom2'"><xsl:call-template name="layout_custom2" /></xsl:when>
				<xsl:otherwise><xsl:call-template name="layout_basic" /></xsl:otherwise>
			</xsl:choose>	
			
		</div> <xsl:comment>! end of #wrapcontent </xsl:comment>
		
		<xsl:if test="$section-nav='true'">
			<xsl:comment>googleoff: snippet</xsl:comment>
			<nav id="nav" class="sectionnav" aria-label="Section Navigation">
				<a class="visuallyhidden" href="#body">Skip to main content</a>
				<span class="section_top"><xsl:comment>Top</xsl:comment></span>
					<div class="section_mid">
						<xsl:call-template name="section-nav" />
					</div>
				<span class="section_btm"><xsl:comment>Bottom</xsl:comment></span>
			</nav>
			<xsl:comment>googleon: snippet</xsl:comment>
		</xsl:if>
		
		<span class="body_btm"><xsl:comment>Bottom</xsl:comment></span>
		
	</xsl:template>

</xsl:stylesheet>
