<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
	<xsl:template name="layout_optionbox">
            
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
                    <xsl:call-template name="render_optionboxes" />
                </div>
                <span class="section_btm"><xsl:comment>Bottom</xsl:comment></span>
            </section>
	    
	</xsl:template>
	
	<xsl:template name="render_optionboxes">
	    <xsl:if test="$optbox1-show='true'" >
		<section>
		    <xsl:attribute name="class"><xsl:value-of select="normalize-space(concat('optbox ', $optbox1-style))" /></xsl:attribute>
		    <xsl:attribute name="id">optbox1</xsl:attribute>
		    <span class="optbox_top"><xsl:comment>Top</xsl:comment></span>
		    <div class="optbox_mid"><xsl:copy-of select="/document/option-box-content[position()=1]/node()" /></div>
		    <span class="optbox_btm"><xsl:comment>Bottom</xsl:comment></span>
		</section>
	    </xsl:if>
	    <xsl:if test="$optbox2-show='true'" >
		<section>
		    <xsl:attribute name="class"><xsl:value-of select="normalize-space(concat('optbox ', $optbox2-style))" /></xsl:attribute>
		    <xsl:attribute name="id">optbox2</xsl:attribute>
		    <span class="optbox_top"><xsl:comment>Top</xsl:comment></span>
		    <div class="optbox_mid"><xsl:copy-of select="/document/option-box-content[position()=2]/node()" /></div>
		    <span class="optbox_btm"><xsl:comment>Bottom</xsl:comment></span>
		</section>
	    </xsl:if>
	    <xsl:if test="$optbox3-show='true'" >
		<section>
		    <xsl:attribute name="class"><xsl:value-of select="normalize-space(concat('optbox ', $optbox3-style))" /></xsl:attribute>
		    <xsl:attribute name="id">optbox3</xsl:attribute>
		    <span class="optbox_top"><xsl:comment>Top</xsl:comment></span>
		    <div class="optbox_mid"><xsl:copy-of select="/document/option-box-content[position()=3]/node()" /></div>
		    <span class="optbox_btm"><xsl:comment>Bottom</xsl:comment></span>
		</section>
	    </xsl:if>
	    <xsl:if test="$optbox4-show='true'" >
		<section>
		    <xsl:attribute name="class"><xsl:value-of select="normalize-space(concat('optbox ', $optbox4-style))" /></xsl:attribute>
		    <xsl:attribute name="id">optbox4</xsl:attribute>
		    <span class="optbox_top"><xsl:comment>Top</xsl:comment></span>
		    <div class="optbox_mid"><xsl:copy-of select="/document/option-box-content[position()=4]/node()" /></div>
		    <span class="optbox_btm"><xsl:comment>Bottom</xsl:comment></span>
		</section>
	    </xsl:if>
	</xsl:template>

</xsl:stylesheet>

