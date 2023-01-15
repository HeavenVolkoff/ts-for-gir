export namespace Cairo {
    /**
     * Specifies the type of antialiasing to do when rendering text or shapes.
     * 
     * The interpretation of {@link Antialias.DEFAULT} is left entirely up to the backend.
     * 
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/core/_cairo.js#L7-12
     * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-antialias-t
     */
    enum Antialias {
        /** Use the default antialiasing for the subsystem and target device */
        DEFAULT,
        /** Use a bilevel alpha mask */
        NONE,
        /** Perform single-color antialiasing (using shades of gray for black text on a white background, for example) */
        GRAY,
        /** Perform antialiasing by taking advantage of the order of subpixel elements on devices such as LCD panels */
        SUBPIXEL,
        // Antialias bellow are not yet supported in GJS
        /** Hint that the backend should perform some antialiasing but prefer speed over quality */
        // FAST
        /** The backend should balance quality against performance */
        // GOOD
        /** Hint that the backend should render at the highest quality, sacrificing speed if necessary */
        // BEST
    }
    
    /**
     * {@link Content} is used to describe the content that a surface will contain,
     * whether color information, alpha information (translucence vs. opacity), or both.
     * 
     * Note:
     * The large values here are designed to keep {@link Context} values distinct from {@link Format} values,
     * so that the implementation can detect the error if users confuse the two types.
     * 
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/core/_cairo.js#L14-18
     * @see https://www.cairographics.org/manual/cairo-cairo-surface-t.html#cairo-content-t
     */
    enum Content {
        /** The surface will hold color content only. */
        COLOR = 0x1000,
        /** The surface will hold alpha content only. */
        ALPHA = 0x2000,
        /** The surface will hold color and alpha content. */
        COLOR_ALPHA = 0x3000,
    }
    
    /**
     * {@link Extend} is used to describe how pattern color/alpha will be determined for areas "outside" the pattern's natural area,
     * for example, outside the surface bounds or outside the gradient geometry.
     * 
     * Mesh patterns are not affected by the extend mode.
     * 
     * The default extend mode is {@link Extend.NONE} for surface patterns and {@link Extend.PAD} for gradient patterns.
     * 
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/core/_cairo.js#L20-25
     * @see https://www.cairographics.org/manual/cairo-cairo-pattern-t.html#cairo-extend-t
     */
    enum Extend {
        /** Pixels outside of the source pattern are fully transparent */
        NONE,
        /** Pattern is tiled by repeating */
        REPEAT,
        /** Pattern is tiled by reflecting at the edges */
        REFLECT,
        /** Pixels outside of the pattern copy the closest pixel from the source */
        PAD,
    }
    
    /**
     * {@link FillRule} is used to select how paths are filled.
     * 
     * For both fill rules, whether or not a point is included in the fill is determined
     * by taking a ray from that point to infinity and looking at intersections with the path.
     * The ray can be in any direction, as long as it doesn't pass through the end point of
     * a segment or have a tricky intersection such as intersecting tangent to the path.
     * 
     * Note:
     * Filling is not actually implemented in this way.
     * This is just a description of the rule that is applied.
     * 
     * The default fill rule is {@link FillRule.WINDING}.
     * 
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/core/_cairo.js#L27-30
     * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-fill-rule-t
     */
    enum FillRule {
        /**
         * If the path crosses the ray from left-to-right, counts +1.
         * If the path crosses the ray from right to left, counts -1.
         * Left and right are determined from the perspective of looking along the ray from the starting point.
         * If the total count is non-zero, the point will be filled.
         */
        WINDING,
        /**
         * Counts the total number of intersections, without regard to the orientation of the contour.
         * If the total number of intersections is odd, the point will be filled.
         */
        EVEN_ODD,
    }
    
    /**
     * {@link Filter} is used to indicate what filtering should be applied when reading pixel values from patterns.
     * See {@link SurfacePattern.setFilter} for indicating the desired filter to be used with a particular pattern.
     * 
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/core/_cairo.js#L32-39
     * @see https://www.cairographics.org/manual/cairo-cairo-pattern-t.html#cairo-filter-t
     */
    enum Filter {
        /** A high-performance filter, with quality similar to {@link Filter.NEAREST}. */
        FAST,
        /** A reasonable-performance filter, with quality similar to {@link Filter.BILINEAR}. */
        GOOD,
        /** The highest-quality available, performance may not be suitable for interactive use. */
        BEST,
        /** Nearest-neighbor filtering. */
        NEAREST,
        /** Linear interpolation in two dimensions. */
        BILINEAR,
        /** This filter value is currently unimplemented, and should not be used in current code. */
        GAUSSIAN,
    }
    
    /**
     * Specifies variants of a font face based on their slant.
     * 
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/core/_cairo.js#L41-45
     * @see https://www.cairographics.org/manual/cairo-text.html#cairo-font-slant-t
     */
    enum FontSlant {
        /** Upright font style */
        NORMAL,
        /** Italic font style */
        ITALIC,
        /** Oblique font style */
        OBLIQUE,
    }
    
    /**
     * Specifies variants of a font face based on their weight.
     * 
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/core/_cairo.js#L47-50
     * @see https://www.cairographics.org/manual/cairo-text.html#cairo-font-weight-t
     */
    enum FontWeight {
        /** Normal font weight */
        NORMAL,
        /** Bold font weight */
        BOLD,
    }
    
    /**
     * Identify the memory format of image data.
     * 
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/core/_cairo.js#L52-59
     * @see https://www.cairographics.org/manual/cairo-Image-Surfaces.html#cairo-format-t
     */
    enum Format {
        /**
         * Each pixel is a 32-bit quantity, with alpha in the upper 8 bits, then red, then green, then blue.
         * The 32-bit quantities are stored native-endian.
         * Pre-multiplied alpha is used (That is, 50% transparent red is 0x80800000, not 0x80ff0000).
         */
        ARGB32,
        /**
         * Each pixel is a 32-bit quantity, with the upper 8 bits unused.
         * Red, Green, and Blue are stored in the remaining 24 bits in that order.
         */
        RGB24,
        /** Each pixel is a 8-bit quantity holding an alpha value. */
        A8,
        /**
         * Each pixel is a 1-bit quantity holding an alpha value.
         * Pixels are packed together into 32-bit quantities.
         * The ordering of the bits matches the endianness of the platform.
         * On a big-endian machine, the first pixel is in the uppermost bit, on a little-endian machine the first pixel is in the least-significant bit.
         */
        A1,
        /**
         * Each pixel is a 16-bit quantity with red in the upper 5 bits, then green in the middle 6 bits, and blue in the lower 5 bits.
         * @deprecated RGB16_565 has never been properly implemented in cairo and should not be used by applications.
         * 
         * Warning:
         * Currently this format is incorretly exposed in GJS, with value 5 instead of 4.
         */
        RGB16_565 = 5
        /** Like RGB24 but with 10bpc. */
        // RGB30
    }
    
    /**
     * Specifies how to render the endpoints of the path when stroking.
     * The default line cap style is {@link LineCap.BUTT}.
     * 
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/core/_cairo.js#L61-65
     * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-line-cap-t
     */
    enum LineCap {
        /** start(stop) the line exactly at the start(end) point. */
        BUTT,
        /** use a round ending, the center of the circle is the end point. */
        ROUND,
        /**
         * Use squared ending, the center of the square is the end point.
         * 
         * Warning:
         * This should be SQUARE, it is currenlty incorrectly named in GJS
         */
        SQUASH,
    }
    
    /**
     * Specifies how to render the junction of two lines when stroking.
     * The default line join style is {@link LineJoin.MITER}.
     * 
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/core/_cairo.js#L67-71
     * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-line-join-t
     */
    enum LineJoin {
        /** use a sharp (angled) corner, see {@link Context.setMiterLimit} */
        MITER,
        /** use a rounded join, the center of the circle is the joint point */
        ROUND,
        /** use a cut-off join, the join is cut off at half the line width from the joint point */
        BEVEL,
    }
    
    /**
     * {@link Operator} is used to set the compositing operator for all cairo drawing operations.
     * 
     * The default operator is {@link Operator.OVER}.
     * 
     * The operators marked as unbounded modify their destination even outside of the mask layer,
     * that is, their effect is not bound by the mask layer.
     * However, their effect can still be limited by way of clipping.
     * 
     * To keep things simple, the operator descriptions here document the behavior for when
     * both source and destination are either fully transparent or fully opaque.
     * The actual implementation works for translucent layers too.
     * For a more detailed explanation of the effects of each operator,
     * including the mathematical definitions
     * @see https://cairographics.org/operators/
     * 
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/core/_cairo.js#L73-103
     * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-operator-t
     */
    enum Operator {
        /** clear destination layer (bounded) */
        CLEAR,
        /** replace destination layer (bounded) */
        SOURCE,
        /** draw source layer on top of destination layer (bounded) */
        OVER,
        /** draw source where there was destination content (unbounded) */
        IN,
        /** draw source where there was no destination content (unbounded) */
        OUT,
        /** draw source on top of destination content and only there */
        ATOP,
        /** ignore the source */
        DEST,
        /** draw destination on top of source */
        DEST_OVER,
        /** leave destination only where there was source content (unbounded) */
        DEST_IN,
        /** leave destination only where there was no source content */
        DEST_OUT,
        /** leave destination on top of source content and only there (unbounded) */
        DEST_ATOP,
        /** source and destination are shown where there is only one of them */
        XOR,
        /** source and destination layers are accumulated */
        ADD,
        /** like over, but assuming source and dest are disjoint geometries */
        SATURATE,
        /** source and destination layers are multiplied. This causes the result to be at least as dark as the darker inputs. */
        MULTIPLY,
        /** source and destination are complemented and multiplied. This causes the result to be at least as light as the lighter inputs. */
        SCREEN,
        /** multiplies or screens, depending on the lightness of the destination color. */
        OVERLAY,
        /** replaces the destination with the source if it is darker, otherwise keeps the source. */
        DARKEN,
        /** replaces the destination with the source if it is lighter, otherwise keeps the source. */
        LIGHTEN,
        /** brightens the destination color to reflect the source color. */
        COLOR_DODGE,
        /** darkens the destination color to reflect the source color. */
        COLOR_BURN,
        /** Multiplies or screens, dependent on source color. */
        HARD_LIGHT,
        /** Darkens or lightens, dependent on source color. */
        SOFT_LIGHT,
        /** Takes the difference of the source and destination color. */
        DIFFERENCE,
        /** Produces an effect similar to difference, but with lower contrast. */
        EXCLUSION,
        /** Creates a color with the hue of the source and the saturation and luminosity of the target. */
        HSL_HUE,
        /** 
         * Creates a color with the saturation of the source and the hue and luminosity of the target.
         * Painting with this mode onto a gray area produces no change.
         */
        HSL_SATURATION,
        /** 
         * Creates a color with the hue and saturation of the source and the luminosity of the target.
         * This preserves the gray levels of the target and is useful for coloring monochrome images or tinting color images.
         */
        HSL_COLOR,
        /** 
         * Creates a color with the luminosity of the source and the hue and saturation of the target.
         * This produces an inverse effect to {@link Operator.HSL_COLOR}.
         */
        HSL_LUMINOSITY,
    }
    
    /**
     * {@link PatternType} is used to describe the type of a given pattern.
     * 
     * The type of a pattern is determined by the function used to create it.
     * The {@link Context.setSourceRGB} and {@link Context.setSourceRGBA} functions create {@link PatternType.SOLID} patterns.
     * The remaining {@link Pattern} subclasses map to pattern types in obvious ways.
     * 
     * The {@link Pattern} type can be queried with {@link Pattern.getType}.
     * 
     * Most {@link Pattern} subclasses can be called with a pattern of any type,
     * though trying to change the extend or filter for a solid pattern will have no effect.
     * A notable exception is {@link Gradient.addColorStopRGB} and {@link Gradient.addColorStopRGBA}
     * which must only be called with gradient patterns (either {@link PatternType.LINEAR} or {@link PatternType.RADIAL}).
     * Otherwise the pattern will be shutdown and put into an error state.
     * 
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/core/_cairo.js#L105-110
     * @see https://www.cairographics.org/manual/cairo-cairo-pattern-t.html#cairo-pattern-type-t
     */
    enum PatternType {
        /** The pattern is a solid (uniform) color. It may be opaque or translucent */
        SOLID,
        /** The pattern is a based on a surface (an image) */
        SURFACE,
        /** The pattern is a linear gradient */
        LINEAR,
        /** The pattern is a radial gradient */
        RADIAL,
        // Patterns bellow are not yet supported in GJS
        /** The pattern is a mesh */
        // MESH
        /** The pattern is a user pattern providing raster data */
        // RASTER_SOURCE
    }
    
    /**
     * {@link SurfaceType} is used to describe the type of a given surface.
     * The surface types are also known as "backends" or "surface backends" within cairo.
     * 
     * The surface type can be queried with {@link Surface.getType}
     * 
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/core/_cairo.js#L112-127
     * @see https://www.cairographics.org/manual/cairo-cairo-surface-t.html#cairo-surface-type-t
     */
    enum SurfaceType {
        /** The surface is of type image */
        IMAGE,
        /** The surface is of type pdf */
        PDF,
        /** The surface is of type ps */
        PS,
        /** The surface is of type xlib */
        XLIB,
        /** The surface is of type xcb */
        XCB,
        /** The surface is of type glitz */
        GLITZ,
        /** The surface is of type quartz */
        QUARTZ,
        /** The surface is of type win32 */
        WIN32,
        /** The surface is of type beos */
        BEOS,
        /** The surface is of type directfb */
        DIRECTFB,
        /** The surface is of type svg */
        SVG,
        /** The surface is of type os2 */
        OS2,
        /** The surface is a win32 printing surface */
        WIN32_PRINTING,
        /** The surface is of type quartz_image */
        QUARTZ_IMAGE,
        // Patterns bellow are not yet supported in GJS
        /** The surface is of type script */
        // SCRIPT
        /** The surface is of type Qt */
        // QT
        /** The surface is of type recording */
        // RECORDING
        /** The surface is a OpenVG surface */
        // VG
        /** The surface is of type OpenGL */
        // GL
        /** The surface is of type Direct Render Manager */
        // DRM
        /** The surface is of type 'tee' (a multiplexing surface) */
        // TEE
        /** The surface is of type XML (for debugging) */
        // XML
        /** ??? */
        // SKIA
        /** The surface is a subsurface created with cairo_surface_create_for_rectangle() */
        // SUBSURFACE
        /** This surface is of type Cogl */
        // COGL
    }
    
    /**
     * A data structure for holding a rectangle with coordinates.
     * 
     * @see https://www.cairographics.org/manual/cairo-Types.html#cairo-rectangle-int-t
     */
    interface Rectangle {
        /** X coordinate of the left side of the rectangle. */
        x: number
        /** Y coordinate of the the top side of the rectangle. */
        y: number
        /** width of the rectangle. */
        width: number
        /** height of the rectangle. */
        height: number
    }

    /**
     * A data structure that stores the extents of a single glyph or a string of glyphs in user-space coordinates.
     * Because text extents are in user-space coordinates, they are mostly, but not entirely,
     * independent of the current transformation matrix.
     * If you call {@link Context.scale|`Context.scale(2, 2)`}, text will be drawn twice as big,
     * but the reported text extents will not be doubled.
     * They will change slightly due to hinting (so you can't assume that metrics are independent of the transformation matrix),
     * but otherwise will remain unchanged.
     * 
     * @see https://www.cairographics.org/manual/cairo-cairo-scaled-font-t.html#cairo-text-extents-t
     */
    interface TextExtents {
        /**
         * The horizontal distance from the origin to the leftmost part of the glyphs as drawn.
         * Positive if the glyphs lie entirely to the right of the origin.
         */
        x_bearing: number
        /**
         * The vertical distance from the origin to the topmost part of the glyphs as drawn.
         * Positive only if the glyphs lie completely below the origin, will usually be negative.
         */
        y_bearing: number
        /** Width of the glyphs as drawn */
        width: number
        /** Height of the glyphs as drawn */
        height: number
        /** Distance to advance in the X direction after drawing these glyphs */
        x_advance: number
        /**
         * Distance to advance in the Y direction after drawing these glyphs.
         * Will typically be zero except for vertical text layout as found in East-Asian languages.
         */
        y_advance: number
    }

    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-region.cpp#L199-212 */
    interface Region {
        /**
         * Updates current region to be the union of it with another region.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-region.cpp#L82
         * @see https://www.cairographics.org/manual/cairo-Regions.html#cairo-region-union
         * 
         * @param o the region to union with region
         */
        union(o: Region): void
        /**
         * Updates current region to be the subtraction of it with another region.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-region.cpp#L83
         * @see https://www.cairographics.org/manual/cairo-Regions.html#cairo-region-subtract
         * 
         * @param o the region to subtract from region
         */
        subtract(o: Region):void
        /**
         * Updates current region to be the intersection of it with another region.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-region.cpp#L84
         * @see https://www.cairographics.org/manual/cairo-Regions.html#cairo-region-intersect
         * 
         * @param o the region to intersect with region
         */
        intersect(o: Region):void
        /**
         * Updates current region to be the exclusive difference of it with given region.
         * That is, this region will be set to contain all areas that are either in it or in the other region, but not in both.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-region.cpp#L85
         * @see https://www.cairographics.org/manual/cairo-Regions.html#cairo-region-xor
         * 
         * @param o the region to xor with region
         */
        xor(o: Region):void
        /**
         * Updates current region to be the union of it with given rectangle
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-region.cpp#L87
         * @see https://www.cairographics.org/manual/cairo-Regions.html#cairo-region-union-rectangle
         * 
         * @param r the rectangle to union with region
         */
        unionRectangle(r: Rectangle):void
        /**
         * Updates current region to be the subtraction of it with given rectangle
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-region.cpp#L88
         * @see https://www.cairographics.org/manual/cairo-Regions.html#cairo-region-subtract-rectangle
         * 
         * @param r the rectangle to subtract from region
         */
        subtractRectangle(r: Rectangle):void
        /**
         * Updates current region to be the intersection of it with given rectangle
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-region.cpp#L89
         * @see https://www.cairographics.org/manual/cairo-Regions.html#cairo-region-intersect-rectangle
         * 
         * @param r the rectangle to intersect with region
         */
        intersectRectangle(r: Rectangle):void
        /**
         * Updates current region to be the exclusive difference of it with given rectangle.
         * That is, this region will be set to contain all areas that are either in it or in the rectangle, but not in both.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-region.cpp#L90
         * @see https://www.cairographics.org/manual/cairo-Regions.html#cairo-region-xor-rectangle
         * 
         * @param r the rectangle to xor with region
         */
        xorRectangle(r: Rectangle):void
        /**
         * Returns the number of rectangles contained in region.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-region.cpp#L154-169
         * @see https://www.cairographics.org/manual/cairo-Regions.html#cairo-region-num-rectangles
         * 
         * @returns number of rectangles contained in region
         */
        numRectangles(): number
        /**
         * Returns the `i`'th rectangle from the region.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-region.cpp#L171-191
         * @see https://www.cairographics.org/manual/cairo-Regions.html#cairo-region-get-rectangle
         * 
         * @param i index of the rectangle to get
         */
        getRectangle(i: number): Rectangle
    
    }

    /**
     * Represents a set of integer-aligned rectangles.
     * It allows set-theoretical operations like {@link Region.union} and {@link Region.intersect} to be performed on them.
     * 
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-region.cpp
     * @see https://www.cairographics.org/manual/cairo-Regions.html#cairo-region-t
     */
    class Region {
        /**
         * Allocates a new empty region object.
         *
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-region.cpp#L214-220
         * @see https://www.cairographics.org/manual/cairo-Regions.html#cairo-region-create
         */
        constructor()
    }
    
    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-surface.cpp#L188-204 */
    interface Surface {
        /**
         * Returns the type of the backend used to create a {@link Surface}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-surface.cpp#L66-88
         * @see https://www.cairographics.org/manual/cairo-cairo-surface-t.html#cairo-surface-get-type
         * 
         * @returns the type of the backend used to create a {@link Surface}
         */
        getType(): SurfaceType
    
        /**
         * Sets an offset that is added to the device coordinates determined by the CTM when drawing to surface.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-surface.cpp#L90-108
         * @see https://www.cairographics.org/manual/cairo-cairo-surface-t.html#cairo-surface-set-device-offset
         * 
         * One use case for this function is when we want to create a new {@link Surface}
         * that redirects drawing for a portion of an onscreen surface to an offscreen surface
         * in a way that is completely invisible to the user of the cairo API.
         * 
         * Note:
         *  That the offset affects drawing to the surface as well as using the surface in a source pattern.
         * 
         * @param xOffset the offset in the X direction in device units
         * @param yOffset the offset in the Y direction in device units
         */
        setDeviceOffset(xOffset: number, yOffset: number): void

        /**
         * Returns the previous device offset set by {@link Surface.setDeviceOffset}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-surface.cpp#L110-136
         * @see https://www.cairographics.org/manual/cairo-cairo-surface-t.html#cairo-surface-get-device-offset
         * 
         * @returns A tuple containing the X and Y offsets in device units
         */
        getDeviceOffset(): [number, number]

        /**
         * Sets a scale that is multiplied to the device coordinates determined by the CTM when drawing to surface.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-surface.cpp#L138-158
         * @see https://www.cairographics.org/manual/cairo-cairo-surface-t.html#cairo-surface-set-device-scale
         * 
         * One common use for this is to render to very high resolution display devices at a scale factor,
         * so that code that assumes 1 pixel will be a certain size will still work.
         * 
         * Note:
         *  That the scale affects drawing to the surface as well as using the surface in a source pattern.
         * 
         * @param xScale a scale factor in the X direction
         * @param yScale a scale factor in the Y direction
         */
        setDeviceScale(xScale: number, yScale: number): void

        /**
         * Returns the previous device scale set by {@link Surface.setDeviceScale}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-surface.cpp#L160-186
         * @see https://www.cairographics.org/manual/cairo-cairo-surface-t.html#cairo-surface-get-device-scale
         * 
         * @returns A tuple containing the X and Y scale in device units
         */
        getDeviceScale(): [number, number]

        /**
         * Writes the contents of surface to a new file as a PNG image.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-surface.cpp#L41-64
         * @see https://www.cairographics.org/manual/cairo-PNG-Support.html#cairo-surface-write-to-png
         * 
         * @param filename Name of PNG file to write to.
         */
        writeToPNG(filename: string): void
    }

    /**
     * Represents an image, either as the destination of a drawing operation or as source when drawing onto another surface.
     * To draw to a {@link Surface}, create a {@link Context|`new Context(surface)`}.
     * 
     * There are different {@link Surface} subclasses for different drawing backends.
     * For example, {@link ImageSurface|`new ImageSurface()`} creates an empty bitmap image in memory.
     * The type of a surface can be queried with {@link Surface.getType}.
     * 
     * The initial contents of a surface after creation depend upon the manner of its creation.
     * If cairo creates the surface and backing storage for the user, it will be initially cleared.
     * Alternatively, if the user passes in a reference to some backing storage and asks cairo to wrap that in a surface,
     * then the contents are not modified.
     * 
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-surface.cpp
     * @see https://www.cairographics.org/manual/cairo-cairo-surface-t.html#cairo-surface-t
     */
    class Surface {
        /** Not instanciable from GJS, use one of the subclasses instead. */
        protected constructor()
    }

    /**
     * A data structure for holding a path.
     * This data structure serves as the return value for {@link Context.copyPath} and {@link Context.copyPathFlat()}
     * as well the input value for {@link Context.appendPath}.
     * 
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-path.cpp
     * @see https://www.cairographics.org/manual/cairo-Paths.html#cairo-path-t
     */
    class Path {
        /** Not instanciable from GJS, use one of the subclasses instead. */
        private constructor()
    }
    
    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-image-surface.cpp#L190-196 */
    interface ImageSurface {
        /**
         * Creates a new image surface and initializes the contents to the given PNG file.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-image-surface.cpp#L53-80
         * @see https://www.cairographics.org/manual/cairo-PNG-Support.html#cairo-image-surface-create-from-png
         * 
         * @param filename Name of PNG file to load.
         * @returns A new {@link ImageSurface} initialized with the contents of the PNG file
         */
        createFromPNG(filename: string): ImageSurface
    
        /**
         * Get the format of the surface.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-image-surface.cpp#L82-107
         * @see https://www.cairographics.org/manual/cairo-Image-Surfaces.html#cairo-image-surface-get-format
         * 
         * @returns The format of the surface.
         */
        getFormat(): Format
    
        /**
         * Get the width of the image surface in pixels.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-image-surface.cpp#L109-134
         * @see https://www.cairographics.org/manual/cairo-Image-Surfaces.html#cairo-image-surface-get-width
         * 
         * @returns The width of the image surface in pixels.
         */
        getWidth(): number
    
        /**
         * Get the height of the image surface in pixels.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-image-surface.cpp#L136-161
         * @see https://www.cairographics.org/manual/cairo-Image-Surfaces.html#cairo-image-surface-get-height
         * 
         * @returns The height of the image surface in pixels.
         */
        getHeight(): number
    
        /**
         * Get the stride of the image surface in bytes
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-image-surface.cpp#L163-188
         * @see https://www.cairographics.org/manual/cairo-Image-Surfaces.html#cairo-image-surface-get-stride
         * 
         * @returns The stride of the image surface in bytes (or 0 if surface is not an image surface).
         *      The stride is the distance in bytes from the beginning of one row of the image data to the beginning of the next row.
         */
        getStride(): number
    }

    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-image-surface.cpp */
    class ImageSurface extends Surface {
        /**
         * Creates a new image surface and initializes the contents to the given PNG file.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-image-surface.cpp#L53-80
         * @see https://www.cairographics.org/manual/cairo-PNG-Support.html#cairo-image-surface-create-from-png
         * 
         * @param filename Name of PNG file to load.
         * @returns A new {@link ImageSurface} initialized with the contents of the PNG file
         */
        static createFromPNG(filename: string): ImageSurface // createFromPNG_func, 1, GJS_MODULE_PROP_FLAGS),
    
        /**
         * Creates an image surface of the specified format and dimensions.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-image-surface.cpp#L27-45
         * @see https://www.cairographics.org/manual/cairo-Image-Surfaces.html#cairo-image-surface-create
         * 
         * Initially the surface contents are set to 0.
         * Specifically, within each pixel, each color or alpha channel belonging to format will be 0.
         * The contents of bits within a pixel, but not belonging to the given format are undefined.
         * 
         * @param format format of pixels in the surface to create
         * @param width width of the surface, in pixels
         * @param height height of the surface, in pixels
         */
        constructor(format: Format, width: number, height: number)
    }

    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-svg-surface.cpp */
    class SVGSurface extends Surface {
        /**
         * Creates a SVG surface of the specified size in points to be written to `filename`.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-svg-surface.cpp#L36-54
         * @see https://www.cairographics.org/manual/cairo-SVG-Surfaces.html#cairo-svg-surface-create
         * 
         * @param filename A filename for the SVG output (must be writable), `null` may be used to specify no output.
         *  This will generate a SVG surface that may be queried and used as a source, without generating a temporary file.
         * @param width Width of the surface, in points (1 point == 1/72 inch)
         * @param height Height of the surface, in points (1 point == 1/72 inch)
         */
        constructor(filename: null | string, width: number, height: number)
    }

    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-ps-surface.cpp */
    class PSSurface extends Surface {
        /**
         * Creates a PostScript surface of the specified size in points to be written to `filename`.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-ps-surface.cpp#L36-54
         * @see https://www.cairographics.org/manual/cairo-PostScript-Surfaces.html#cairo-ps-surface-create
         * 
         * Note:
         *  The size of individual pages of the PostScript output can vary.
         * 
         * @param filename A filename for the PS output (must be writable), `null` may be used to specify no output.
         *  This will generate a PS surface that may be queried and used as a source, without generating a temporary file.
         * @param width Width of the surface, in points (1 point == 1/72.0 inch)
         * @param height Height of the surface, in points (1 point == 1/72.0 inch)
         */
        constructor(filename: null | string, width: number, height: number)
    }

    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-pdf-surface.cpp */
    class PDFSurface extends Surface {
        /**
         * Creates a PDF surface of the specified size in points to be written to `filename`.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-pdf-surface.cpp#L36-54
         * @see https://www.cairographics.org/manual/cairo-PDF-Surfaces.html#cairo-pdf-surface-create
         * 
         * @param filename A filename for the PDF output (must be writable), `null` may be used to specify no output.
         *  This will generate a PDF surface that may be queried and used as a source, without generating a temporary file.
         * @param width Width of the surface, in points (1 point == 1/72.0 inch)
         * @param height Height of the surface, in points (1 point == 1/72.0 inch)
         */
        constructor(filename: null | string, width: number, height: number)
    }

    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-pattern.cpp#L57-61 */
    interface Pattern {
        /**
         * Get the pattern's type.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-pattern.cpp#L33-55
         * @see https://www.cairographics.org/manual/cairo-cairo-pattern-t.html#cairo-pattern-get-type
         * 
         * @returns the type of the pattern
         */
        getType(): PatternType
    }

    /**
     * Represents a source when drawing onto a surface.
     * 
     * There are different {@link Pattern} subclasses, for different types of sources.
     * For example, {@link SolidPattern.createRGB} creates a pattern for a solid opaque color.
     * 
     * Other than various specific {@link Pattern} subclasses, some of the types can be
     * implicitly created using various {@link Context} methods, such as: {@link Context.setSourceRGB}.
     * 
     * The type of a pattern can be queried with {@link Pattern.getType}.
     * 
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-pattern.cpp
     * @see https://www.cairographics.org/manual/cairo-cairo-pattern-t.html#cairo-pattern-t
     */
    class Pattern {
        /** Not instanciable from GJS, use one of the subclasses instead. */
        protected constructor()
    }

    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-surface-pattern.cpp#L160-165 */
    interface SurfacePattern {
        /**
         * Sets the mode to be used for drawing outside the area of a pattern.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-surface-pattern.cpp#L51-75
         * @see https://www.cairographics.org/manual/cairo-cairo-pattern-t.html#cairo-pattern-set-extend
         * 
         * The default extend mode is CAIRO_EXTEND_NONE for surface patterns and CAIRO_EXTEND_PAD for gradient patterns.
         * 
         * @param extend How to extend the pattern outside its natural area. Default is {@link Extend.NONE}.
         */
        setExtend(extend: Extend): void

        /**
         * Gets the current extend mode for a pattern.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-surface-pattern.cpp#L77-103
         * @see https://www.cairographics.org/manual/cairo-cairo-pattern-t.html#cairo-pattern-get-extend
         * 
         * @returns Current extend strategy used for drawing the pattern.
         */
        getExtend(): Extend

        /**
         * Sets the filter to be used for resizing when using this pattern.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-surface-pattern.cpp#L105-131
         * @see https://www.cairographics.org/manual/cairo-cairo-pattern-t.html#cairo-pattern-set-filter
         * 
         * @param filter Describes the filter to use for resizing the pattern.
         */
        setFilter(filter: Filter): void

        /**
         * Gets the current filter used for a pattern.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-surface-pattern.cpp#L131-157
         * @see https://www.cairographics.org/manual/cairo-cairo-pattern-t.html#cairo-pattern-get-filter
         * 
         * @returns Current filter used for resizing the pattern.
         */
        getFilter(): Filter
    }

    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-surface-pattern.cpp */
    class SurfacePattern extends Pattern {
        /**
         * Creates a new {@link SurfacePattern} for the given {@link Surface}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-surface-pattern.cpp#L27-45
         * @see https://www.cairographics.org/manual/cairo-cairo-pattern-t.html#cairo-pattern-create-for-surface
         * 
         * @param surface The surface to be used as the source for the pattern
         */
        constructor(surface: Surface)
    }

    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-solid-pattern.cpp#L94-97 */
    interface SolidPattern {
        /**
         * Creates a pattern corresponding to an opaque color.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-solid-pattern.cpp#L32-60
         * @see https://www.cairographics.org/manual/cairo-cairo-pattern-t.html#cairo-pattern-create-rgb
         * 
         * The color components are floating point numbers in the range 0 to 1.
         * If the values passed in are outside that range, they will be clamped.
         * 
         * @param red red component of color
         * @param green green component of color
         * @param blue blue component of color
         */
         createRGB(red: number, green: number, blue: number): void

        /**
         * Creates a pattern corresponding to a translucent color.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-solid-pattern.cpp#L62-91
         * @see https://www.cairographics.org/manual/cairo-cairo-pattern-t.html#cairo-pattern-create-rgba
         * 
         * The color components are floating point numbers in the range 0 to 1.
         * If the values passed in are outside that range, they will be clamped.
         * 
         * @param red red component of color
         * @param green green component of color
         * @param blue blue component of color
         * @param alpha alpha component of color
         */
         createRGBA(red: number, green: number, blue: number, alpha: number): void
    }

    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-solid-pattern.cpp */
    class SolidPattern extends Pattern {
        /** Not instanciable from GJS */
        private constructor()
    }

    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-gradient.cpp#L95-100 */
    interface Gradient {
        /**
         * Adds an opaque color stop to a gradient pattern.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-gradient.cpp#L36-63
         * @see https://www.cairographics.org/manual/cairo-cairo-pattern-t.html#cairo-pattern-add-color-stop-rgb
         * 
         * The offset specifies the location along the gradient's control vector.
         * A linear gradient's control vector is from (`x0`, `y0`) to (`x1`, `y1`)
         * A radial gradient's control vector is from any point on the start circle to the corresponding point on the end circle.
         * 
         * If two (or more) stops are specified with identical offset values,
         * they will be sorted according to the order in which the stops are added.
         * Stops added earlier will compare less than stops added later.
         * This can be useful for reliably making sharp color transitions instead of the typical blend.
         * 
         * @param offset an offset in the range [0 .. 1]
         * @param red red component of color
         * @param green green component of color
         * @param blue blue component of color
         */
        addColorStopRGB(offset: number, red: number, green: number, blue: number): void

        /**
         * Adds a translucent color stop to a gradient pattern.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-gradient.cpp#L36-63
         * @see https://www.cairographics.org/manual/cairo-cairo-pattern-t.html#cairo-pattern-add-color-stop-rgba
         * 
         * The offset specifies the location along the gradient's control vector.
         * A linear gradient's control vector is from (`x0`, `y0`) to (`x1`, `y1`)
         * A radial gradient's control vector is from any point on the start circle to the corresponding point on the end circle.
         * 
         * If two (or more) stops are specified with identical offset values,
         * they will be sorted according to the order in which the stops are added.
         * Stops added earlier will compare less than stops added later.
         * This can be useful for reliably making sharp color transitions instead of the typical blend.
         * 
         * @param offset an offset in the range [0 .. 1]
         * @param red red component of color
         * @param green green component of color
         * @param blue blue component of color
         * @param alpha alpha component of color
         */
        addColorStopRGBA(offset: number, red: number, green: number, blue: number, alpha: number): void
    }

    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-gradient.cpp */
    class Gradient extends Pattern {
        /** Not instanciable from GJS, use one of the subclasses instead. */
        protected constructor()
    }

    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-radial-gradient.cpp */
    class RadialGradient extends Gradient {
        /**
         * Creates a new {@link RadialGradient} between the two circles defined by (`cx0`, `cy0`, `radius0`) and (`cx1`, `cy1`, `radius1`).
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-radial-gradient.cpp#L28-47
         * @see https://www.cairographics.org/manual/cairo-cairo-pattern-t.html#cairo-pattern-create-radial
         * 
         * Before using the gradient pattern,
         * a number of color stops should be defined using {@link Gradient.addColorStopRGB()} or {@link Gradient.addColorStopRGBA()}.
         * 
         * @param cx0 X coordinate for the center of the start circle
         * @param cy0 Y coordinate for the center of the start circle
         * @param radius0 radius of the start circle
         * @param cx1 X coordinate for the center of the end circle
         * @param cy1 Y coordinate for the center of the end circle
         * @param radius1 radius of the end circle
         */
        constructor(cx0: number, cy0: number, radius0: number, cx1: number, cy1: number, radius1: number)
    }

    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-linear-gradient.cpp */
    class LinearGradient extends Gradient {
        /**
         * Create a new {@link LinearGradient} along the line defined by (`x0`, `y0`) and (`x1`, `y1`)
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-linear-gradient.cpp#L28-45
         * @see https://www.cairographics.org/manual/cairo-cairo-pattern-t.html#cairo-pattern-create-linear
         * 
         * Before using the gradient pattern,
         * a number of color stops should be defined using {@link Gradient.addColorStopRGB()} or {@link Gradient.addColorStopRGBA()}.
         * 
         * @param x0 X coordinate of the start point
         * @param y0 Y coordinate of the start point
         * @param x1 X coordinate of the end point
         * @param y1 Y coordinate of the end point
         */
        constructor(x0: number, y0: number, x1: number, y1: number)
    }

    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L830-929 */
    interface Context {
        /**
         * Free a {@link Context} and all associated memory.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/cairo.md#cairocontextdispose
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L363-376
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-destroy
         * 
         * Unlike other objects and values in GJS, a {@link Context} object requires an explicit free function to avoid memory leaks.
         * Whenever you acquire an instance, the {@link Context.$dispose} method must be called when you are done with it.
         */
        $dispose(): void

        /**
         * Append a {@link Path} onto the current path.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L378-399
         * @see https://www.cairographics.org/manual/cairo-Paths.html#cairo-append-path
         * 
         * The path may be either the return value from one of {@link Context.copyPath} or
         * {@link Context.copyPathFlat} or it may be constructed manually.
         * 
         * @param path {@link Path} to be appended
         */
        appendPath(path: Path): void

        /**
         * Adds a circular arc of the given radius to the current path.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L286-288
         * @see https://www.cairographics.org/manual/cairo-Paths.html#cairo-arc
         * 
         * The arc is centered at (`xc`, `yc`), begins at `angle1` and proceeds in the direction of increasing angles to end at `angle2`.
         * If `angle2` is less than `angle1` it will be progressively increased by `2 * Math.PI` until it is greater than `angle1`.
         * 
         * If there is a current point, an initial line segment will be added to the path to connect the current point to the beginning of the arc.
         * If this initial line is undesired, it can be avoided by calling {@link Context.newSubPath} before calling {@link Context.arc}.
         * 
         * Angles are measured in radians.
         * To convert from degrees to radians, use `degrees * (Math.PI / 180)`.
         * An angle of 0 is in the direction of the positive X axis (in user space).
         * An angle of `Math.PI / 2` radians (90 degrees) is in the direction of the positive Y axis (in user space).
         * Angles increase in the direction from the positive X axis toward the positive Y axis.
         * So with the default transformation matrix, angles increase in a clockwise direction.
         * 
         * This function gives the arc in the direction of increasing angles.
         * See {@link Context.arcNegative()} to get the arc in the direction of decreasing angles.
         * 
         * The arc is circular in user space.
         * To achieve an elliptical arc, you can use {@link Context.scale()} to scale the current transformation
         * matrix by different amounts in the X and Y directions.
         * 
         * @param xc X position of the center of the arc
         * @param yc Y position of the center of the arc
         * @param radius the radius of the arc
         * @param angle1 the start angle, in radians
         * @param angle2 the end angle, in radians
         */
        arc(xc: number, yc: number, radius: number, angle1: number, angle2: number): void

        /**
         * Adds a circular arc of the given radius to the current path.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L289-291
         * @see https://www.cairographics.org/manual/cairo-Paths.html#cairo-arc-negative
         * 
         * The arc is centered at (`xc`, `yc`), begins at `angle1` and proceeds in the direction of decreasing angles to end at `angle2`.
         * If `angle2` is greater than `angle1` it will be progressively decreased by `2 * Math.PI` until it is less than `angle1`.
         * 
         * {@link Context.arcNegative} differs from {@link Context.arc} only in the direction of the arc between the two angles.
         * 
         * @param xc X position of the center of the arc
         * @param yc Y position of the center of the arc
         * @param radius the radius of the arc
         * @param angle1 the start angle, in radians
         * @param angle2 the end angle, in radians
         */
        arcNegative(xc: number, yc: number, radius: number, angle1: number, angle2: number): void

        /**
         * Establishes a new clip region by intersecting the current clip region with the current path,
         * as it would be filled by {@link Context.fill} and according to the current {@link FillRule}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L295
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-clip
         * 
         * After {@link Context.clip}, the current path will be cleared.
         * 
         * The current clip region affects all drawing operations by effectively masking out
         * any changes to the surface that are outside the current clip region.
         * 
         * Calling {@link Context.clip} can only make the clip region smaller, never larger.
         * 
         * But the current clip is part of the graphics state, so a temporary restriction of the clip region
         * can be achieved by calling {@link Context.clip} within a {@link Context.save}/{@link Context.restore} pair.
         * 
         * The only other means of increasing the size of the clip region is {@link Context.resetClip}.
         */
        clip(): void

        /**
         * Computes a bounding box in user coordinates covering the area inside the current clip.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L297
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-clip-extents
         * 
         * @returns An array containing left, top, right, and bottom coordinates of the bounding box
         */
        clipExtents(): [number, number, number, number]

        /**
         * Establishes a new clip region by intersecting the current clip region with the current path
         * as it would be filled by {@link Context.fill()} and according to the current {@link FillRule}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L296
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-clip-preserve
         * 
         * The current clip region affects all drawing operations by effectively masking out
         * any changes to the surface that are outside the current clip region.
         * 
         * Calling {@link Context.clipPreserve} can only make the clip region smaller, never larger.
         * 
         * But the current clip is part of the graphics state, so a temporary restriction of the clip region
         * can be achieved by calling {@link Context.clip} within a {@link Context.save}/{@link Context.restore} pair.
         * 
         * The only other means of increasing the size of the clip region is {@link Context.resetClip}.
         */
        clipPreserve(): void

        /**
         * Adds a line segment to the path from the current point to the beginning of the current sub-path,
         * the most recent point passed to {@link Context.moveTo}, and closes this sub-path.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L298
         * @see https://www.cairographics.org/manual/cairo-Paths.html#cairo-close-path
         * 
         * After this call the current point will be at the joined endpoint of the sub-path.
         * 
         * The behavior of {@link Context.closePath} is distinct from simply calling {@link Context.lineTo}
         * with the equivalent coordinate in the case of stroking.
         * 
         * When a closed sub-path is stroked, there are no caps on the ends of the sub-path.
         * 
         * Instead, there is a line join connecting the final and initial segments of the sub-path.
         * 
         * If there is no current point before the call to {@link Context.closePath}, this function will have no effect.
         */
        closePath(): void

        /**
         * Emits the current page for backends that support multiple pages, but doesn't clear it.
         * So, the contents of the current page will be retained for the next page too.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L299
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-copy-page
         * 
         * Use {@link Context.showPage} if you want to get an empty page after the emission.
         */
        copyPage(): void

        /**
         * Creates a copy of the current path and returns it to the user as a path.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L401-421
         * @see https://www.cairographics.org/manual/cairo-Paths.html#cairo-copy-path
         * 
         * @returns The copy of the current path.
         */
        copyPath(): Path

        /**
         * Gets a flattened copy of the current path and returns it to the user as a path.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L423-443
         * @see https://www.cairographics.org/manual/cairo-Paths.html#cairo-copy-path-flat
         * 
         * This function is like {@link Context.copyPathFlat} except that any curves in the path will be
         * approximated with piecewise-linear approximations, accurate to within the current tolerance value.
         * 
         * @returns The copy of the current path.
         */
        copyPathFlat(): Path

        /**
         * Adds a cubic Bézier spline to the path from the current point to position (`x3`, `y3`) in user-space coordinates,
         * using (`x1`, `y1`) and (`x2`, `y2`) as the control points. After this call the current point will be (`x3`, `y3`).
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L292-294
         * @see https://www.cairographics.org/manual/cairo-Paths.html#cairo-curve-to
         * 
         * @param x1 X coordinate of the first control point.
         * @param y1 Y coordinate of the first control point.
         * @param x2 X coordinate of the second control point.
         * @param y2 Y coordinate of the second control point.
         * @param x3 X coordinate of the end of the curve.
         * @param y3 Y coordinate of the end of the curve.
         */
        curveTo(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void

        /**
         * Transform a coordinate from device space to user space by multiplying the given point
         * by the inverse of the current transformation matrix (CTM).
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L300
         * @see https://www.cairographics.org/manual/cairo-Transformations.html#cairo-device-to-user
         * 
         * @param x X value of coordinate (in/out parameter)
         * @param y Y value of coordinate (in/out parameter)
         * @returns The transformed coordinate.
         */
        deviceToUser(x: number, y: number): [number, number]

        /**
         * Transform a distance vector from device space to user space.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L301
         * @see https://www.cairographics.org/manual/cairo-Transformations.html#cairo-device-to-user-distance
         * 
         * This function is similar to {@link Context.deviceToUser} except that the translation components
         * of the inverse CTM will be ignored when transforming (`dx`, `dy`).
         * 
         * @param dx X component of a distance vector (in/out parameter)
         * @param dy Y component of a distance vector (in/out parameter)
         * @returns The transformed distance vector.
         */
        deviceToUserDistance(dx: number, dy: number): [number, number]

        /**
         * A drawing operator that fills the current path according to the current fill rule,
         * each sub-path is implicitly closed before being filled.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L302
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-fill
         * 
         * After {@link Context.fill}, the current path will be cleared.
         */
        fill(): void

        /**
         * A drawing operator that fills the current path according to the current fill rule,
         * each sub-path is implicitly closed before being filled.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L303
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-fill-preserve
         * 
         * Unlike {@link Context.fill}, {@link Context.fillPreserve} preserves the path.
         */
        fillPreserve(): void

        /**
         * Computes a bounding box in user coordinates covering the area that would be affected (the "inked" area),
         * by a {@link Context.fill} operation given the current path and fill parameters.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L304
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-fill-extents
         * 
         * If the current path is empty, returns an empty rectangle `[0, 0, 0, 0]`.
         * 
         * Surface dimensions and clipping are not taken into account.
         * 
         * Contrast with {@link Context.pathExtents}, which is similar, but returns
         * non-zero extents for some paths with no inked area, such as a simple line segment.
         * 
         * Note:
         *  {@link Context.fillExtents} must necessarily do more work to compute the precise inked areas in light of the fill rule,
         *  so {@link Context.pathExtends} may be more desirable for sake of performance if the non-inked path extents are desired.
         */
        fillExtents(): [number, number, number, number]

        /**
         * Gets the current shape antialiasing mode, as set by Context.setAntialias().
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L305
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-get-antialias
         * 
         * @returns The current shape antialiasing mode.
         */
        getAntialias(): number

        /**
         * Gets the current point of the current path, which is conceptually the final point reached by the path so far.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L306
         * @see https://www.cairographics.org/manual/cairo-Paths.html#cairo-get-current-point
         * 
         * The current point is returned in the user-space coordinate system.
         * If there is no defined current point or if {@link Context} is in an error status, returns `[0, 0]`.
         * It is possible to check this in advance with {@link Context.hasCurrentPoint()}
         * 
         * Most path construction functions alter the current point.
         * Some functions use and alter the current point but do not otherwise change current path: {@link Context.showText()}.
         * Some functions unset the current path and as a result, current point: {@link Context.fill()}, {@link Context.stroke()}
         * 
         * @returns Current point of the current path.
         */
        getCurrentPoint(): [number, number]

        /**
         * Gets the length of the dash array (0 if dashing is not currently in effect).
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L307
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-get-dash-count
         * @see Context.setDash()
         * 
         * @retuns Length of the dash array, or 0 if no dash array set.
         */
        getDashCount(): number

        /**
         * Gets the current fill rule, as set by {@link Context.setFillRule()}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L308
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-get-fill-rule
         * 
         * @returns The current fill rule.
         */
        getFillRule(): number

        /**
         * Gets the current destination surface for the context.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L765-794
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-get-group-target
         * 
         * This is either the original target surface as passed to {@link Context|`new Context()`} or
         * the target surface for the current group as started by the most recent call
         * to {@link Context.pushGroup} or {@link Context.pushGroupWithContent}.
         * 
         * @returns Current destination surface for the context.
         */
        getGroupTarget(): null | Surface

        /**
         * Gets the current line cap style, as set by {@link Context.setLineCap}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L309
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-get-line-cap
         * 
         * @returns Current line cap style.
         */
        getLineCap(): number

        /**
         * Gets the current line join style, as set by {@link Context.setLineJoin}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L310
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-get-line-join
         * 
         * @returns Current line join style.
         */
        getLineJoin(): number

        /**
         * This function returns the current line width value exactly as set by {@link Context.setLineWidth}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L311
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-get-line-width
         * 
         * Note:
         *  The value is unchanged even if the CTM has changed between the calls to
         *  {@link Context.setLineWidth} and {@link Context.getLineWidth}.
         * 
         * @returns Current line width value.
         */
        getLineWidth(): number

        /**
         * Gets the current miter limit, as set by {@link Context.setMiterLimit}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L312
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-get-miter-limit
         * 
         * @returns Current miter limit.
         */
        getMiterLimit(): number

        /**
         * Gets the current compositing operator for a cairo context.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L313
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-get-operator
         * 
         * @returns Current compositing operator.
         */
        getOperator(): number

        /**
         * Gets the current source pattern.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L702-732
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-get-source
         * 
         * @returns Current source pattern.
         */
        getSource(): Pattern

        /**
         * Gets the target surface as passed to {@link Context|`new Context()`}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L734-763
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-get-target
         * 
         * @return Target surface.
         */
        getTarget(): null | Surface

        /**
         * Gets the current tolerance value, as set by {@link Context.setTolerance}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L734-763
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-get-tolerance
         * 
         * @returns Current tolerance value.
         */
        getTolerance(): number

        /**
         * Returns whether a current point is defined on the current path.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L315
         * @see https://www.cairographics.org/manual/cairo-Paths.html#cairo-has-current-point
         * 
         * @returns Whether a current point is defined.
         */
        hasCurrentPoint(): boolean

        /**
         * Resets the current transformation matrix (CTM) by setting it equal to the identity matrix.
         * That is, the user-space and device-space axes will be aligned and one user-space unit will transform to one device-space unit.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L316
         * @see https://www.cairographics.org/manual/cairo-Transformations.html#cairo-identity-matrix
         */
        identityMatrix(): void

        /**
         * Tests whether the given point is inside the area that would be affected by a {@link Context.fill} operation
         * given the current path and filling parameters.
         * Surface dimensions and clipping are not taken into account.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L317
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-in-fill
         * 
         * @param x X coordinate of the point to test.
         * @param y Y coordinate of the point to test.
         * @returns Whether the point is inside fill area.
         */
        inFill(x: number, y: number): boolean

        /**
         * Tests whether the given point is inside the area that would be affected by a {@link Context.stroke} operation
         * given the current path and stroking parameters.
         * Surface dimensions and clipping are not taken into account.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L318
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-in-stroke
         * 
         * @param x X coordinate of the point to test.
         * @param y Y coordinate of the point to test.
         * @returns Whether the point is inside stroke area.
         */
        inStroke(x: number, y: number): boolean

        /**
         * Adds a line to the path from the current point to position (`x`, `y`) in user-space coordinates.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L319
         * @see https://www.cairographics.org/manual/cairo-Paths.html#cairo-line-to
         * 
         * After this call the current point will be (`x`, `y`).
         * 
         * If there is no current point before the call to {@link Context.lineTo}
         * this function will behave as {@link Context.moveTo|`Context.moveTo(x, y)`}.
         * 
         * @param x X coordinate of the point to test.
         * @param y Y coordinate of the point to test.
         */
        lineTo(x: number, y: number): void

        /**
         * A drawing operator that paints the current source using the alpha channel of pattern as a mask.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L445-470
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-mask
         * 
         * Opaque areas of pattern are painted with the source, transparent areas are not painted.
         * 
         * @param pattern Pattern to use as a mask.
         */
        mask(pattern: Pattern): void

        /**
         * A drawing operator that paints the current source using the alpha channel of surface as a mask.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L472-500
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-mask-surface
         * 
         * Opaque areas of surface are painted with the source, transparent areas are not painted.
         * 
         * @param surface Surface to use as a mask.
         * @param x X coordinate at which to place the origin of surface
         * @param y Y coordinate at which to place the origin of surface
         */
        maskSurface(surface: Surface, x: number, y: number): void

        /**
         * Begin a new sub-path.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L320
         * @see https://www.cairographics.org/manual/cairo-Paths.html#cairo-move-to
         * 
         * After this call the current point will be (`x`, `y`).
         * 
         * @param x X coordinate of the new position.
         * @param y Y coordinate of the new position.
         */
        moveTo(x: number, y: number): void

        /**
         * Clears the current path.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L321
         * @see https://www.cairographics.org/manual/cairo-Paths.html#cairo-new-path
         * 
         * After this call there will be no path and no current point.
         */
        newPath(): void

        /**
         * Begin a new sub-path.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L322
         * @see https://www.cairographics.org/manual/cairo-Paths.html#cairo-new-sub-path
         * 
         * After this call there will be no current point.
         * 
         * Note:
         *  Existing path is not affected.
         * 
         * In many cases, this call is not needed since new sub-paths are frequently started with {@link Context.moveTo}.
         * 
         * A call to {@link Context.newSubPath} is particularly useful when beginning a new sub-path with one of the {@link Context.arc} calls.
         * This makes things easier as it is no longer necessary to manually compute the arc's initial coordinates for a call to {@link Context.moveTo}.
         */
        newSubPath(): void

        /**
         * A drawing operator that paints the current source everywhere within the current clip region.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L323
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-paint
         */
        paint(): void

        /**
         * A drawing operator that paints the current source everywhere within the current clip region using a mask of constant alpha value alpha.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L324
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-paint-with-alpha
         * 
         * The effect is similar to {@link Context.paint}, but the drawing is faded out using the alpha value.
         */
        paintWithAlpha(): void

        /**
         * Computes a bounding box in user-space coordinates covering the points on the current path.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L325
         * @see https://www.cairographics.org/manual/cairo-Paths.html#cairo-path-extents
         * 
         * If the current path is empty, returns an empty rectangle `[0, 0, 0, 0]`.
         * Stroke parameters, fill rule, surface dimensions and clipping are not taken into account.
         * 
         * Contrast with {@link Context.fillExtents} and {@link Context.strokeExtents}
         * which return the extents of only the area that would be "inked" by the corresponding drawing operations.
         *
         * The result of {@link Context.pathExtents()} is defined as equivalent to the limit of {@link Context.strokeExtents}
         * with {@link LineCap.ROUND} as the line width approaches 0,
         * but never reaching the empty-rectangle returned by {@link Context.strokeExtents} for a line width of 0.
         * 
         * Specifically, this means that zero-area sub-paths such as {@link Context.moveTo}, {@link Context.lineTo} segments,
         * even degenerate cases where the coordinates to both calls are identical, will be considered as contributing to the extents.
         * 
         * However, a lone {@link Context.moveTo} will not contribute to the results of {@link Context.pathExtents}.
         * 
         * @returns An array containing the left, top, right, and bottom coordinates of the resulting extents.
         */
        pathExtents(): [number, number, number, number]

        /**
         * Terminates the redirection begun by a call to {@link Context.pushGroup} or {@link Context.pushGroupWithContent}
         * Returns a new pattern containing the results of all drawing operations performed to the group.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L671-701
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-pop-group
         * 
         * The {@link Context.popGroup} function calls {@link Context.restore}, balancing a call to {@link Context.save}
         * by the {@link Context.pushGroup} function, so that any changes to the graphics state will not be visible outside the group.
         * 
         * @returns a newly created (Surface) Pattern containing the results of all drawing operations performed to the group.
         */
        popGroup(): Pattern

        /**
         * Terminates the redirection begun by a call to {@link Context.pushGroup} or {@link Cairo.pushGroupWithContent()}
         * and installs the resulting pattern as the source pattern in the given cairo context.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L329
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-pop-group-to-source
         */
        popGroupToSource(): void

        /**
         * Temporarily redirects drawing to an intermediate {@link Surface} known as a group.
         * The redirection lasts until the group is completed by a call to {@link Context.popGroup} or {@link Context.popGroupToSource}.
         * These calls provide the result of any drawing to the group as a pattern, either as an explicit object, or set as the source pattern.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L326
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-push-group
         * 
         * This group functionality can be convenient for performing intermediate compositing.
         * 
         * One common use of a group is to render objects as opaque within the group, (so that they occlude each other),
         * and then blend the result with translucence onto the destination.
         * 
         * Groups can be nested arbitrarily deep by making balanced calls to {@link Context.pushGroup}/{@link Context.popGroup}.
         * Each call pushes/pops the new target group onto/from a stack.
         * 
         * The {@link Context.pushGroup} function calls {@link Context.save} so that any changes to the graphics state
         * will not be visible outside the group, the pop_group functions call {@link Context.restore}.
         * 
         * By default the intermediate group will have a content type of {@link Content.COLOR_ALPHA}.
         * 
         * Other content types can be chosen for the group by using {@link Content.pushGroupWithContent} instead.
         */
        pushGroup(): void

        /**
         * Temporarily redirects drawing to an intermediate {@link Surface} known as a group.
         * The redirection lasts until the group is completed by a call to {@link Context.popGroup} or {@link Context.popGroupToSource}.
         * These calls provide the result of any drawing to the group as a pattern, either as an explicit object, or set as the source pattern.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L327-328
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-push-group-with-content
         * 
         * 
         * The group will have a content type of content.
         * The ability to control this content type is the only distinction between this function and
         * {@link Context.pushGroup} which you should see for a more detailed description of group rendering.
         * 
         * @param content Indicating the type of group that will be created
         */
        pushGroupWithContent(content: Content): void

        /**
         * Adds a closed sub-path rectangle of the given size to the current path at position (`x`, `y`) in user-space coordinates.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L330-331
         * @see https://www.cairographics.org/manual/cairo-Paths.html#cairo-rectangle
         * 
         * @param x the X coordinate of the top left corner of the rectangle
         * @param y the Y coordinate to the top left corner of the rectangle
         * @param width the width of the rectangle
         * @param height the height of the rectangle
         */
        rectangle(x: number, y: number, width: number, height: number): void

        /**
         * Relative-coordinate version of {@link Context.curveTo}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L332-334
         * @see https://www.cairographics.org/manual/cairo-Paths.html#cairo-rel-curve-to
         * 
         * All offsets are relative to the current point.
         * 
         * Adds a cubic Bézier spline to the path from the current point to
         * a point offset from the current point by (`dx3`, `dy3`), using points
         * offset by (`dx1`, `dy1`) and (`dx2`, `dy2`) as the control points.
         * 
         * After this call the current point will be offset by (`dx3`, `dy3`).
         * 
         * @param dx1 the X offset to the first control point
         * @param dy1 the Y offset to the first control point
         * @param dx2 the X offset to the second control point
         * @param dy2 the Y offset to the second control point
         * @param dx3 the X offset to the end of the curve
         * @param dy3 the Y offset to the end of the curve
         */
        relCurveTo(dx1: number, dy1: number, dx2: number, dy2: number, dx3: number, dy3: number): void

        /**
         * Relative-coordinate version of {@link Context.lineTo}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L335
         * @see https://www.cairographics.org/manual/cairo-Paths.html#cairo-rel-line-to
         * 
         * Adds a line to the path from the current point to a point that is offset from the current point by (`dx`, `dy`) in user space.
         * 
         * After this call the current point will be offset by (`dx`, `dy`).
         * 
         * Given a current point of (`x`, `y`), {@link Context.relLineTo|`Context.relLineTo(dx, dy)`} is
         * logically equivalent to {@link Context.lineTo|`Context.lineTo(x + dx, y + dy)`}.
         * 
         * @param dx the X offset to the end of the new line
         * @param dy the Y offset to the end of the new line
         * @throws if there is no current point
         */
        relLineTo(dx: number, dy: number): void

        /**
         * Begin a new sub-path. After this call the current point will offset by (`x`, `y`).
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L336
         * @see https://www.cairographics.org/manual/cairo-Paths.html#cairo-rel-move-to
         * 
         * Given a current point of (`x`, `y`), {@link Context.relMoveTo|`Context.relMoveTo(dx, dy)`} is
         * logically equivalent to {@link Context.moveTo|`Context.moveTo(x + dx, y + dy)`}.
         * 
         * @param dx the X offset
         * @param dy the Y offset
         * @throws if there is no current point
         */
        relMoveTo(dx: number, dy: number): void

        /**
         * Reset the current clip region to its original, unrestricted state.
         * That is, set the clip region to an infinitely large shape containing the target surface.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L337
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-reset-clip
         * 
         * Equivalently, if infinity is too hard to grasp, one can imagine the clip region being
         * reset to the exact bounds of the target surface.
         * 
         * Note:
         *  Code meant to be reusable should not call {@link Context.resetClip} as it will cause results
         *  unexpected by higher-level code which calls {@link Context.clip}.
         *  Consider using {@link Context.save} and {@link Context.restore} around {@link Context.clip} as a more
         *  robust means of temporarily restricting the clip region.
         */
        resetClip(): void

        /**
         * Restores the state saved by a preceding call to {@link Context.save} and removes
         * that state from the stack of saved states.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L338
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-restore
         */
        restore(): void

        /**
         * Modifies the current transformation matrix (CTM) by rotating the user-space axes by angle radians.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L339
         * @see https://www.cairographics.org/manual/cairo-Transformations.html#cairo-rotate
         * 
         * The rotation of the axes takes places after any existing transformation of user space.
         * 
         * The rotation direction for positive angles is from the positive X axis toward the positive Y axis.
         * 
         * @param angle Angle (in radians) by which the user-space axes will be rotated
         */
        rotate(angle: number): void

        /**
         * Makes a copy of the current state and saves it on an internal stack of saved states.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L340
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-save
         * 
         * When {@link Context.restore} is called, current context will be restored to the saved state.
         * 
         * Multiple calls to {@link Context.save} and {@link Context.restore} can be nested.
         * Each call to {@link Context.restore} restores the state from the matching paired {@link Context.save}.
         * 
         * It isn't necessary to clear all saved states before calling {@link Context.$dispose}.
         * If the reference count of current context drops to zero in response to a call to {@link Context.$dispose},
         * any saved states will be automatically freed.
         */
        save(): void

        /**
         * Modifies the current transformation matrix (CTM) by scaling the X and Y user-space axes by sx and sy respectively.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L341
         * @see https://www.cairographics.org/manual/cairo-Transformations.html#cairo-scale
         * 
         * The scaling of the axes takes place after any existing transformation of user space.
         * 
         * @param sx scale factor for the X dimension
         * @param sy scale factor for the Y dimension
         */
        scale(sx: number, sy: number): void

        /**
         * Selects a family and style of font from a simplified description as a family name, slant and weight.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L644-669
         * @see https://www.cairographics.org/manual/cairo-text.html#cairo-select-font-face
         * 
         * Note:
         * The {@link Context.selectFontFace} function call is part of what the cairo designers call the "toy" text API.
         * It is convenient for short demos and simple programs, but it is not expected to be adequate for serious text-using applications.
         * 
         * Cairo provides no operation to list available family names on the system (this is a "toy", remember),
         * but the standard CSS2 generic family names, ("serif", "sans-serif", "cursive", "fantasy", "monospace"),
         * are likely to work as expected.
         * 
         * If family starts with the string "cairo:", or if no native font backends are compiled in, cairo will use an internal font family.
         * The internal font family recognizes many modifiers in the family string, most notably, it recognizes the string "monospace".
         * That is, the family name "cairo:monospace" will use the monospace version of the internal font family.
         * 
         * If text is drawn without a call to {@link Context.selectFontFace}, the default family is platform-specific, but is essentially "sans-serif".
         * 
         * Default slant is {@link FontSlant.NORMAL}, and default weight is {@link FontWeight.NORMAL}.
         * 
         * @param family a font family name, encoded in UTF-8
         * @param slant the slant for the font
         * @param weight the weight for the font
         */
        selectFontFace(family: string, slant: FontSlant, weight: FontWeight): void

        /**
         * Set the antialiasing mode of the rasterizer used for drawing shapes.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L342
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-set-antialias
         * 
         * This value is a hint, and a particular backend may or may not support a particular value.
         * At the current time, no backend supports {@link Antialias.SUBPIXEL} when drawing shapes.
         * 
         * Note:
         *  This does not affect text rendering
         * 
         * @param antialias the new antialiasing mode
         */
        setAntialias(antialias: Antialias): void

        /**
         * Sets the dash pattern to be used by {@link Context.stroke}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L502-559
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-set-antialias
         * 
         * A dash pattern is specified by `dashes`, an array of positive values.
         * Each value provides the length of alternate "on" and "off" portions of the stroke.
         * The `offset` specifies an `offset` into the pattern at which the stroke begins.
         * 
         * Each "on" segment will have caps applied as if the segment were a separate sub-path.
         * In particular, it is valid to use an "on" length of 0 with {@link LineCap.ROUND} or
         * {@link LineCap.SQUARE} in order to distributed dots or squares along a path.
         * 
         * Note:
         *  The length values are in user-space units as evaluated at the time of stroking.
         *  This is not necessarily the same as the user space at the time of {@link Context.setDash}.
         * 
         * @param dashes an array specifying alternate lengths of on and off stroke portions
         *  Empty array means dasing is disabled.
         *  Single element array means a symmetric pattern is assumed with alternating on and off portions of the size specified by the given value.
         * @param offset an offset into the dash pattern at which the stroke should start
         * @throws If any value in dashes is negative, or if all values are 0
         */
        setDash(dashes: number[], offset: number): void

        /**
         * Sets the current font matrix to a scale by a factor of size, replacing any font matrix previously set with {@link Context.setFontSize}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L344
         * @see https://www.cairographics.org/manual/cairo-text.html#cairo-set-font-size
         * 
         * This results in a font size of size user space units.
         * More precisely, this matrix will result in the font's em-square being a size by size square in user space.
         * 
         * Note:
         *  If text is drawn without a call to {@link Context.setFontSize}, the default font size is 10.
         * 
         * @param size the new font size, in user space units
         */
        setFontSize(size: number): void

        /**
         * Set the current fill rule.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L343
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-set-fill-rule
         *
         * The fill rule is used to determine which regions are inside or outside a complex (potentially self-intersecting) path.
         * The current fill rule affects both {@link Context.fill} and {@link Context.clip}.
         * 
         * Default fill rule is {@link FillRule.RULE_WINDING}.
         *
         * @param fillRule A {@link FillRule} style.
         */
        setFillRule(fillRule: FillRule): void

        /**
         * Sets the current line cap style.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L345
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-set-line-cap
         * 
         * As with the other stroke parameters, the current line cap style is examined by {@link Context.stroke} and
         * {@link Context.strokeExtents}, but does not have any effect during path construction.
         * 
         * The default line cap style is {@link LineCap.BUTT}.
         * 
         * @param lineCap A {@link LineCap} style
         */
        setLineCap(lineCap: LineCap): void

        /**
         * Sets the current line join style.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L346
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-set-line-join
         * 
         * As with the other stroke parameters, the current line cap style is examined by {@link Context.stroke} and
         * {@link Context.strokeExtents}, but does not have any effect during path construction.
         * 
         * The default line join style is {@link LineJoin.MITER}.
         * 
         * @param lineJoin A {@link LineJoin} style
         */
        setLineJoin(lineJoin: LineJoin): void

        /**
         * Sets the current line width.
         * The line width value specifies the diameter of a pen that is circular in user space,
         * though device-space pen may be an ellipse in general due to scaling/shear/rotation of the CTM.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L347
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-set-line-width
         * 
         * Note:
         *  When the description above refers to user space and CTM it refers to the user space and CTM in effect at the time of
         *  the stroking operation, not the user space and CTM in effect at the time of the call to {@link Context.setLineWidth}.
         *  The simplest usage makes both of these spaces identical.
         *  That is, if there is no change to the CTM between a call to {@link Context.setLineWidth} and the stroking operation,
         *  then one can just pass user-space values to {@link Context.setLineWidth} and ignore this note.
         * 
         * As with the other stroke parameters, the current line cap style is examined by {@link Context.stroke} and
         * {@link Context.strokeExtents}, but does not have any effect during path construction.
         * 
         * The default line width value is 2.
         * 
         * @param width A line width
         */
        setLineWidth(width: number): void

        /**
         * Sets the current miter limit.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L348
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-set-miter-limit
         * 
         * If the current line join style is set to {@link LineJoin.MITER}, see {@link Context.setLineJoin},
         * the miter limit is used to determine whether the lines should be joined with a bevel instead of a miter.
         * Cairo divides the length of the miter by the line width.
         * If the result is greater than the miter limit, the style is converted to a bevel.
         * 
         * As with the other stroke parameters, the current line cap style is examined by {@link Context.stroke} and
         * {@link Context.strokeExtents}, but does not have any effect during path construction.
         * 
         * The default miter limit value is 10, which will convert joins with interior angles less than 11 degrees to bevels instead of miters.
         * For reference, a miter limit of 2 makes the miter cutoff at 60 degrees, and a miter limit of 1.414 makes the cutoff at 90 degrees.
         * 
         * A miter limit for a desired angle can be computed as: `limit = 1 / Math.sin(angle / 2)`
         * 
         * @param limit Miter limit to set
         */
        setMiterLimit(limit: number): void

        /**
         * Sets the compositing operator to be used for all following drawing operations.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L349
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-set-operator
         * 
         * The default operator is {@link Operator.OVER}.
         * 
         * @param op A compositing {@link Operator}
         */
        setOperator(op: Operator): void

        /**
         * Sets the source pattern.
         * This pattern will then be used for any subsequent drawing operation until a new source pattern is set.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L561-587
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-set-source
         * 
         * Note:
         * The pattern's transformation matrix will be locked to the user space in effect at the time of {@link Context.setSource}.
         * This means that further modifications of the current transformation matrix will not affect the source pattern.
         * 
         * The default source pattern is a solid pattern that is opaque black,
         * that is, it is equivalent to {@link Context.setSourceRGB|`Context.setSourceRGB(0, 0, 0)`}.
         * 
         * @param source A {@link Pattern} to be used as the source for subsequent drawing operations.
         */
        setSource(source: Pattern): void

        /**
         * Sets the source pattern within {@link Context} to an opaque color.
         * This opaque color will then be used for any subsequent drawing operation until a new source pattern is set.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L351-352
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-set-source-rgb
         * 
         * The color components are floating point numbers in the range 0 to 1.
         * If the values passed in are outside that range, they will be clamped.
         * 
         * The default source pattern is opaque black, which is equivalent to {@link Context.setSourceRGB|`Context.setSourceRGB(0, 0, 0)`}.
         * 
         * @param red the red component of the color
         * @param green the green component of the color
         * @param blue the blue component of the color
         */
        setSourceRGB(red: number, green: number, blue: number): void

        /**
         * Sets the source pattern within {@link Context} to a translucent color.
         * This color will then be used for any subsequent drawing operation until a new source pattern is set.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L353-354
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-set-source-rgba
         * 
         * The color components are floating point numbers in the range 0 to 1.
         * If the values passed in are outside that range, they will be clamped.
         * 
         * The default source pattern is opaque black, which is equivalent to {@link Context.setSourceRGBA|`Context.setSourceRGBA(0, 0, 0, 1)`}.
         * 
         * @param red the red component of the color
         * @param green the green component of the color
         * @param blue the blue component of the color
         * @param alpha the alpha component of the color
         */
        setSourceRGBA(red: number, green: number, blue: number, alpha: number): void

        /**
         * This is a convenience function for creating a pattern from surface and setting it as the source with {@link Context.setSource}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L589-618
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-set-source-surface
         * 
         * The `x` and `y` parameters give the user-space coordinate at which the surface origin should appear.
         * The surface origin is its upper-left corner before any transformation has been applied.
         * The `x` and `y` parameters are negated and then set as translation values in the pattern matrix.
         * 
         * Other than the initial translation pattern matrix, as described above, all other pattern attributes,
         * such as its extend mode, are set to the default values as in {@link Surface}.
         * The resulting pattern can be queried with {@link Context.getSource} so that these attributes can be modified if desired:
         * Eg. to create a repeating pattern with {@link Surface.setExtend}.
         * 
         * @param surface The surface to be used to set the source pattern
         * @param x User-space X coordinate for surface origin
         * @param y User-space Y coordinate for surface origin
         */
        setSourceSurface(surface: Surface, x: number, y: number): void

        /**
         * Sets the tolerance used when converting paths into trapezoids.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L350
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-set-tolerance
         * 
         * Curved segments of the path will be subdivided until the maximum deviation between
         * the original path and the polygonal approximation is less than tolerance.
         * 
         * The default value is `0.1`. A larger value will give better performance, a smaller value, better appearance.
         * Reducing the value from the default value of `0.1` is unlikely to improve appearance significantly.
         * 
         * The accuracy of paths within Cairo is limited by the precision of its internal arithmetic,
         * and the prescribed tolerance is restricted to the smallest representable internal value.
         * 
         * @param tolerance The tolerance, in device units (typically pixels)
         */
        setTolerance(tolerance: number): void

        /**
         * Emits and clears the current page for backends that support multiple pages.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L355
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-show-page
         * 
         *  Use {@link Context.copyPage} if you don't want to clear the page.
         */
        showPage(): void

        /**
         * A drawing operator that generates the shape from a string of UTF-8 characters,
         * rendered according to the current fontFace, fontSize (fontMatrix), and fontOptions.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L620-642
         * @see https://www.cairographics.org/manual/cairo-text.html#cairo-show-text
         * 
         * This function first computes a set of glyphs for the string of text.
         * The first glyph is placed so that its origin is at the current point.
         * The origin of each subsequent glyph is offset from that of the previous glyph by the advance values of the previous glyph.
         * 
         * After this call the current point is moved to the origin of where the next glyph would be placed in this same progression.
         * That is, the current point will be at the origin of the final glyph offset by its advance values.
         * This allows for easy display of a single logical string with multiple calls to {@link Context.showText}.
         * 
         * Note:
         *  The {@link Context.showText} function call is part of what the cairo designers call the "toy" text API.
         *  It is convenient for short demos and simple programs, but it is not expected to be adequate for serious text-using applications.
         * 
         * @param utf8 The text to render in context
         */
        showText(utf8: string): void

        /**
         * A drawing operator that strokes the current path according to the current line width, line join, line cap, and dash settings
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L356
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-stroke
         * 
         * After {@link Context.stroke}, the current path will be cleared from the cairo context.
         * 
         * NOTE:
         *  Degenerate segments and sub-paths are treated specially and provide a useful result.
         *  These can result in two different situations:
         *  1. Zero-length "on" segments set in cairo_set_dash().
         *     If the cap style is {@link LineCap.ROUND} or {@link LineCap.SQUASH} then these segments will be drawn as circular dots or squares respectively.
         *     In the case of CAIRO_LINE_CAP_SQUARE, the orientation of the squares is determined by the direction of the underlying path.
         *  2. A sub-path created by {@link Context.moveTo} followed by either a {@link Context.closePath} or one or more calls to {@link Context.lineTo}
         *     to the same coordinate as the {@link Context.moveTo}. If the cap style is {@link LineCap.ROUND} then these sub-paths will be drawn as circular dots.
         *     Note:
         *      That in the case of {@link LineCap.SQUASH} a degenerate sub-path will not be drawn at all, since the correct orientation is indeterminate.
         * 
         * In no case will a cap style of {@link LineCap.BUTT} cause anything to be drawn in the case of either degenerate segments or sub-paths.
         */
        stroke(): void

        /**
         * Computes a bounding box in user coordinates covering the area that would be affected, the "inked" area,
         * by a {@link Context.stroke} operation given the current path and stroke parameters.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L358
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-stroke-extents
         * 
         * If the current path is empty, returns an empty rectangle `[0, 0, 0, 0]`.
         * Surface dimensions and clipping are not taken into account.
         * 
         * Note:
         *  That if the line width is set to exactly zero, then {@link Context.strokeExtents} will return an empty rectangle.
         *  Contrast with {@link Context.pathExtents} which can be used to compute the non-empty bounds as the line width approaches zero.
         * 
         * Note:
         *  That {@link Context.strokeExtents} must necessarily do more work to compute the precise inked areas in light of the stroke parameters,
         *  so {@link Context.pathExtents} may be more desirable for sake of performance if non-inked path extents are desired.
         * 
         * @returns An array containing left, top, right, and bottom coordinates of the bounding box
         */
        strokeExtents():  [number, number, number, number]

        /**
         * A drawing operator that strokes the current path according to the current line width, line join, line cap, and dash settings.
         * Unlike {@link Context.stroke}, {@link Context.strokePreserve} preserves the path within the cairo context.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L357
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-stroke-preserve
         */
        strokePreserve(): void

        /**
         * Gets the extents for a string of text.
         * The extents describe a user-space rectangle that encloses the "inked" portion of the text, as it would be drawn by {@link Context.showText}.
         * Additionally, the {@link TextExtents.x_advance} and {@link TextExtents.y_advance} values indicate the amount by which the current point would be advanced by {@link Context.showText}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L796-827
         * @see https://www.cairographics.org/manual/cairo-text.html#cairo-text-extents
         * 
         * Note:
         *  That whitespace characters do not directly contribute to the size of the rectangle ({@link TextExtents.width} and {@link TextExtents.height}).
         *  They do contribute indirectly by changing the position of non-whitespace characters.
         *  In particular, trailing whitespace characters are likely to not affect the size of the rectangle,
         *  though they will affect the {@link TextExtents.x_advance} and {@link TextExtents.y_advance} values.
         * 
         * @param utf8 The text to render in context.
         * @returns A TextExtents object containing the extents of the text.
         */
        textExtents(utf8: string): TextExtents

        /**
         * Modifies the current transformation matrix (CTM) by translating the user-space origin by (`tx`, `ty`).
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L359
         * @see https://www.cairographics.org/manual/cairo-Transformations.html#cairo-translate
         * 
         * This offset is interpreted as a user-space coordinate according to the CTM in place before the new call to {@link Context.translate}.
         * In other words, the translation of the user-space origin takes place after any existing transformation.
         * 
         * @param tx Amount to translate in the X direction
         * @param ty Amount to translate in the Y direction
         */
        translate(tx: number, ty: number): void

        /**
         * Transform a coordinate from user space to device space by multiplying the given point by the current transformation matrix (CTM).
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L360
         * @see https://www.cairographics.org/manual/cairo-Transformations.html#cairo-user-to-device
         * 
         * @param x X value of coordinate, in user space units
         * @param y Y value of coordinate, in user space units
         * @returns An array containing the transformed X and Y values, in device space units
         */
        userToDevice(x: number, y: number): [number, number]

        /**
         * Transform a distance vector from user space to device space.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L361
         * @see https://www.cairographics.org/manual/cairo-Transformations.html#cairo-user-to-device-distance
         * 
         * This function is similar to {@link Context.userToDevice},
         * except that the translation components of the CTM will be ignored when transforming (`dx`, `dy`).
         * 
         * @param dx X value of coordinate, in user space units
         * @param dy Y value of coordinate, in user space units
         * @returns An array containing the transformed X and Y values, in device space units
         */
        userToDeviceDistance(dx: number, dy: number): [number, number]
    }

    /**
     * Represents the current state of the rendering device, including coordinates of yet to be drawn shapes.
     * Cairo contexts, are central to cairo and all drawing with cairo is always done to a {@link Context} object.
     * 
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp
     * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-t
     */
    class Context {
        /**
         * Creates a new {@link Context} with all graphics state parameters set to default values and with target a {@link Surface}.
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo-context.cpp#L249-269
         * @see https://www.cairographics.org/manual/cairo-cairo-t.html#cairo-create
         * 
         * @param surface target surface for the context
         */
        constructor(surface: Surface)
    }
}