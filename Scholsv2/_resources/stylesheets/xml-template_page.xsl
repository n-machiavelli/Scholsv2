<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://commons.omniupdate.com/dtd/standard.dtd">
<xsl:stylesheet version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"
    exclude-result-prefixes="ou">
   
	<xsl:output method="xml" indent="yes" encoding="UTF-8" />
	<xsl:strip-space elements="*"/>
	
	<!-- OU Variables -->
	<xsl:param name="ou:site" />
	<xsl:param name="ou:filename" />
	<xsl:param name="ou:dirname" />
	<xsl:param name="ou:action" />
	<xsl:param name="ou:path" />
	<xsl:param name="ou:root" />
	<xsl:param name="ou:httproot" />
	
	<xsl:template match="document">
		<!-- Selects first main-content node -->
		<xsl:variable name="main" select="main-content[position()=1]" />
		
		<!-- Start your root level node -->
		<xml-template>
			<!-- File Info -->
			<last-modified><xsl:value-of select="current-dateTime()" /></last-modified>
			<filename><xsl:value-of select="$ou:filename" /></filename>
			<dirname><xsl:value-of select="$ou:dirname" /></dirname>
			<httproot><xsl:value-of select="$ou:httproot" /></httproot>
			
			<!-- Start of your XML data node-->
			<data>
				<!-- Selects title from config -->
				<title><xsl:value-of select="normalize-space(config/title)" /></title>
				
				<!-- Selects p with id = string. Runs it through clean template to remove comments and extra spaces -->
				<string>
					<xsl:call-template name="clean">
						<xsl:with-param name="node" select="$main/p[@id='string']" />
					</xsl:call-template>
				</string>
				
				<!-- Selects div with id = editor. Runs it through clean template to remove comments -->
				<editor>
					<xsl:call-template name="clean">
						<xsl:with-param name="node" select="$main/div[@id='editor']" />
					</xsl:call-template>
				</editor>
				
				<!-- The rest follow the same process of one of the two above -->
				<radio>
					<xsl:call-template name="clean">
						<xsl:with-param name="node" select="$main/p[@id='radio']" />
					</xsl:call-template>
				</radio>
				
				<checkbox>
					<xsl:call-template name="clean">
						<xsl:with-param name="node" select="$main/p[@id='checkbox']" />
					</xsl:call-template>
				</checkbox>
				
				<select>
					<xsl:call-template name="clean">
						<xsl:with-param name="node" select="$main/p[@id='select']" />
					</xsl:call-template>
				</select>
				
				<image>
					<xsl:call-template name="clean">
						<xsl:with-param name="node" select="$main/div[@id='image']" />
					</xsl:call-template>
				</image>
				
				<!-- Image broken down into its attributes -->
				<image-attr>
					<xsl:for-each select="$main/div[@id='image']/img/@*">
					    <xsl:variable name="attr"><xsl:value-of select="name(.)" /></xsl:variable>
					    <xsl:text disable-output-escaping="yes">&lt;</xsl:text><xsl:value-of select="$attr" /><xsl:text disable-output-escaping="yes">&gt;</xsl:text>
						<xsl:value-of select="." />
					    <xsl:text disable-output-escaping="yes">&lt;</xsl:text>/<xsl:value-of select="$attr" /><xsl:text disable-output-escaping="yes">&gt;</xsl:text>
					</xsl:for-each>
				</image-attr>
				
				<description>
					<xsl:call-template name="clean">
						<xsl:with-param name="node" select="$main/section[@id='description']" />
					</xsl:call-template>
				</description>
				
				<short>
					<xsl:call-template name="clean">
						<xsl:with-param name="node" select="$main/section[@id='short']" />
					</xsl:call-template>
				</short>
				
				<facts>
					<xsl:call-template name="clean">
						<xsl:with-param name="node" select="$main/section[@id='facts']" />
					</xsl:call-template>
				</facts>
				
				<!-- 
				Table:
				If the there is a need to be one or more child nodes, using the table tools will
				enable the end user to add additional rows while keeping a markup structure intact.
				
				The example XSL checks for empty cells and cells only containing a space because
				the WYSIWYG editor likes to insert them. NOTE: If the user splits or merges cells, 
				deletes columns, or anything the breaks the starting table structure, it will 
				most likely render your XSL useless.		
				-->
				<table>
					<xsl:for-each select="$main/section[@id='table']/table/tbody/tr/.">
					    <xsl:if test="position()!= 1">
					        <xsl:variable name="check" select="td/." />
					        <xsl:if test="$check != '&#160;'">
					            <advisor>
					                <xsl:for-each select="td/.">
					                    <xsl:if test="position()=1">
					                        <xsl:variable name="name" select="." />
					                        <name>
					                            <xsl:choose>
					                                <xsl:when test="starts-with($name,'&#160;')">
					                                    <xsl:value-of select="substring-after($name,'&#160;')"/>
					                                </xsl:when>
					                                <xsl:otherwise>
					                                    <xsl:value-of select="normalize-space(.)"/>
					                                </xsl:otherwise>
					                            </xsl:choose>
					                        </name>
					                    </xsl:if>
					                    <xsl:if test="position()=2">
					                        <xsl:variable name="phone" select="."/>
					                        <phone>
					                            <xsl:choose>
					                                <xsl:when test="starts-with($phone,'&#160;')">
					                                    <xsl:value-of select="substring-after($phone,'&#160;')"/>
					                                </xsl:when>
					                                <xsl:otherwise>
					                                    <xsl:value-of select="normalize-space(.)"/>
					                                </xsl:otherwise>
					                            </xsl:choose>
					                        </phone>
					                    </xsl:if>
					                    <xsl:if test="position()=3">
					                        <xsl:variable name="address" select="."/>
					                        <address>
					                            <xsl:choose>
					                                <xsl:when test="starts-with($address,'&#160;')">
					                                    <xsl:value-of select="substring-after($address,'&#160;')"/>
					                                </xsl:when>
					                                <xsl:otherwise>
					                                    <xsl:value-of select="normalize-space(.)"/>
					                                </xsl:otherwise>
					                            </xsl:choose>
					                        </address>
					                    </xsl:if>
					                    <xsl:if test="position()=4">
					                        <xsl:variable name="email" select="."/>
					                        <email>
					                            <xsl:choose>
					                                <xsl:when test="starts-with($email,'&#160;')">
					                                    <xsl:value-of select="substring-after($email,'&#160;')"/>
					                                </xsl:when>
					                                <xsl:otherwise>
					                                    <xsl:value-of select="normalize-space(.)"/>
					                                </xsl:otherwise>
					                            </xsl:choose>
					                        </email>
					                    </xsl:if>
					                    <xsl:if test="position()=5">
					                        <xsl:variable name="note" select="."/>
					                        <note>
					                            <xsl:choose>
					                                <xsl:when test="starts-with($note,'&#160;')">
					                                    <xsl:value-of select="substring-after($note,'&#160;')"/>
					                                </xsl:when>
					                                <xsl:otherwise>
					                                    <xsl:value-of select="normalize-space(.)"/>
					                                </xsl:otherwise>
					                            </xsl:choose>
					                        </note>
					                    </xsl:if>
					                </xsl:for-each>
					            </advisor>
					        </xsl:if>
					    </xsl:if>
					</xsl:for-each>
				</table>
			</data>
		</xml-template>
	</xsl:template>
	
<!-- 
	Use clean template to remove all comments from the root level. Comments within a node will not be removed
	If there are child nodes (HTML markup), they will be wrapped in CDATA
	If the node is just text, the comments will be removed and normalize-space will be applied
-->
	<xsl:template name="clean">
		<xsl:param name="node" />
		<xsl:variable name="cleanNode" select="normalize-space($node)" />
		<xsl:variable name="nodeCount" select="count($node/*)" />
		
		<xsl:choose>
			<xsl:when test="$nodeCount=0 and $cleanNode!=''">
				<xsl:value-of select="$cleanNode" />
			</xsl:when>
			<xsl:when test="$nodeCount&gt;0">
				<xsl:text disable-output-escaping="yes">&lt;![CDATA[</xsl:text>	
					<xsl:for-each select="$node/*">
						<xsl:copy-of select="." />
					</xsl:for-each>
				<xsl:text disable-output-escaping="yes">]]&gt;</xsl:text>
			</xsl:when>
		</xsl:choose>
	</xsl:template>	

</xsl:stylesheet>
