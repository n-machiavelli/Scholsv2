<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
    <xsl:output method="xml" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"  />
		
	<xsl:include href="nivo.xsl" />
	
	<xsl:template name="content-render">	
	
		<span class="body_top"><xsl:comment>Top</xsl:comment></span>		
		
		<div id="wrapcontent">
			
			<section>
            	<xsl:attribute name="class">content1</xsl:attribute>
                
                <span class="section_top"><xsl:comment>Top</xsl:comment></span>
                <div class="section_mid">
					
					<h1>Marquee Admin</h1>
					<xsl:if test="$ou:action='prv' or $ou:action='edt'" >
						<div style="display:none">
							<xsl:comment> com.omniupdate.div label="hidden_multi_edit" button="hide" group="everyone" </xsl:comment>
							<xsl:comment> com.omniupdate.multiedit type="text" prompt="hidden" </xsl:comment>
							<xsl:comment> /com.omniupdate.div </xsl:comment>
						</div>
					</xsl:if>
					
					<xsl:call-template name="nivo" />
					
                </div>
                <span class="section_btm"><xsl:comment>Bottom</xsl:comment></span>
            </section>
			
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
