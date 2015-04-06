<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
	<xsl:template name="layout_callout">
            
            <xsl:call-template name="render-intro" />
			<xsl:variable name="aside_content" select="document/option-box-content[position()=1]" />

            <section>
            	<xsl:attribute name="class">content<xsl:value-of select="1+$intro-offset" /></xsl:attribute>
                
                <span class="section_top"><xsl:comment>Top</xsl:comment></span>
                <div class="section_mid callout_mid">
					
					
					<xsl:comment>googleoff: all</xsl:comment>
					
					<div class="callout-wrapper">
					
						<xsl:call-template name="render-giving"><xsl:with-param name="label" select="'1'" /></xsl:call-template>
					
						<aside class="callout-filler">
							<span class="aside_top"><xsl:comment>Top</xsl:comment></span>
							<div class="aside_mid">
								<xsl:if test="count($aside_content/*)&gt;0">
									<xsl:for-each select="$aside_content/*">
										<xsl:copy-of select="." />
									</xsl:for-each>
								</xsl:if>
							</div>
							<span class="aside_btm"><xsl:comment>Bottom</xsl:comment></span>
						</aside>
					
					</div>
					
					<xsl:comment>googleon: all</xsl:comment>
					

					<xsl:copy-of select="document/main-content[position()=1+$intro-offset]/node()" />
	
					<div class="callout-main">
						
						<xsl:call-template name="render-giving"><xsl:with-param name="label" select="'2'" /></xsl:call-template>
						
						<aside class="aside" role="complementary">
							<span class="aside_top"><xsl:comment>Top</xsl:comment></span>
							<div class="aside_mid">
								<xsl:copy-of select="$aside_content/node()" />
							</div>
							<span class="aside_btm"><xsl:comment>Bottom</xsl:comment></span>
						</aside>
						
					</div>

                </div>
                <span class="section_btm"><xsl:comment>Bottom</xsl:comment></span>
            </section>     
                
	</xsl:template>

</xsl:stylesheet>
