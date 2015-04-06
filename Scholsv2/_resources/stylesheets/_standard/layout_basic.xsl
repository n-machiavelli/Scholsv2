<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
	<xsl:template name="layout_basic">
            
            <xsl:call-template name="render-intro" />
            
            <section>
            	<xsl:attribute name="class">content<xsl:value-of select="1+$intro-offset" /></xsl:attribute>
                
                <span class="section_top"><xsl:comment>Top</xsl:comment></span>
                <div class="section_mid">
                    <xsl:call-template name="render-giving" />
					
					<!--
					<p><xsl:value-of select="$ou:dirname" /></p>
					<p><xsl:value-of select="replace(replace($ou:dirname,'^/(.+?)(/|$).*','$1'),'( |_)','-')" /></p>
					
					<p><xsl:value-of select="concat(' page-',substring(lower-case(replace(replace($ou:filename,'( |-|_)','-'),'\.(php|shtml)','')),1,24))" /></p>
					-->
					
                    <xsl:copy-of select="document/main-content[position()=1+$intro-offset]/node()" />
                </div>
                <span class="section_btm"><xsl:comment>Bottom</xsl:comment></span>
            </section>     
                
	</xsl:template>

</xsl:stylesheet>
