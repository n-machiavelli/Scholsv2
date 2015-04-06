<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
	<xsl:template name="layout_sidebar">
            
            <xsl:call-template name="render-intro" />
            
            <section>
            	<xsl:attribute name="class">content<xsl:value-of select="1+$intro-offset" /></xsl:attribute>
                
                <span class="section_top"><xsl:comment>Top</xsl:comment></span>
                <div class="section_mid">         
                    <xsl:copy-of select="document/main-content[position()=1+$intro-offset]/node()" />
                </div>
                <span class="section_btm"><xsl:comment>Bottom</xsl:comment></span>
            </section>
	    
	    <section>
            	<xsl:attribute name="class">content<xsl:value-of select="2+$intro-offset" /></xsl:attribute>
                
                <span class="section_top"><xsl:comment>Top</xsl:comment></span>
                <div class="section_mid">
		    <xsl:call-template name="render-giving" />
                    <xsl:copy-of select="document/option-box-content[position()=1]/node()" />
                </div>
                <span class="section_btm"><xsl:comment>Bottom</xsl:comment></span>
            </section>
	    
	</xsl:template>

</xsl:stylesheet>

