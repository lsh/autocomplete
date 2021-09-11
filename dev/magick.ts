const visualTypes = [
  "StaticGray",
  "TrueColor",
  "GrayScale",
  "DirectColor",
  "StaticColor",
  "default",
  "PseudoColor",
  "visual id",
];

const listGenerator = (list: string): Fig.Generator => ({
  script: `magick -list ${list}`,
  postProcess: function (lines) {
    return lines.split("\n").map((name) => ({ name }));
  },
});

// TODO: add comma based postprocessing
const channelGenerator: Fig.Generator = {
  script: "magick -list Channel",
  postProcess: function (lines) {
    return lines.split("\n").map((name) => ({ name }));
  },
};

const colorGenerator: Fig.Generator = {
  script: "magick -list Color | tail +6 | awk '{ print $1,$2 }'",
  postProcess: function (lines) {
    return lines.split("\n").map((line) => {
      const [name, description] = line.split(" ");
      return { name, description };
    });
  },
};

const commaSeparatedGenerator = (values: Fig.Suggestion[]): Fig.Generator => ({
  script: function (context) {
    return `echo ${context[context.length - 1]}`;
  },
  postProcess: function (tokens) {
    const i = tokens.split(",").filter((d) => d).length;
    const { name, description } =
      i < values.length ? values[i] : { name: "", description: "" };
    return [{ name, description }];
  },
  trigger: ",",
  getQueryTerm: ",",
});

// Create a generator that gives suggestions for a and b when written axb
// expects numberxnumber
const axbGenerator = (a: Fig.Suggestion, b: Fig.Suggestion): Fig.Generator => ({
  script: function (context) {
    const arg = context[context.length - 1];
    if (arg.split("x").length > 1) {
      return `echo 1`;
    } else {
      return `echo 0`;
    }
  },
  postProcess: function (input) {
    if (+input) {
      return [b];
    } else {
      return [a];
    }
  },
  trigger: "x",
  getQueryTerm: "x",
});

const geometryArg = {
  name: "geometry",
  description: "",
};

const colorArg = {
  name: "color",
  description:
    "a color name, a hex color, or a numerical RGB, RGBA, HSL, HSLA, CMYK, or CMYKA specification.",
  icon: "🎨",
  generators: colorGenerator,
};

const pctArg = {
  name: "value%",
  description: "A percentage value",
};

const completionSpec: Fig.Spec = {
  name: "magick",
  description: "",
  parserDirectives: {
    flagsArePosixNoncompliant: true,
  },
  subcommands: [
    {
      name: "convert",
      args: [{ name: "Input Image", isVariadic: true, template: "filepaths" }],
      options: [
        {
          name: "-adaptive-blur",
          description:
            "adaptively blur pixels, with decreasing effect near edges.",
          args: {
            name: "radius[xsigma]",
            generators: axbGenerator(
              { name: "radius" },
              { name: "sigma", description: "defaults to 1 if not entered." }
            ),
          },
        },
        {
          name: "-adaptive-resize",
          description: "resize the image using data-dependent triangulation.",
          args: geometryArg,
        },
        {
          name: "-adaptive-sharpen",
          description:
            "adaptively sharpen pixels, with increasing effect near edges.",
          args: {
            name: "radius[xsigma]",
            generators: axbGenerator(
              { name: "radius" },
              { name: "sigma", description: "defaults to 1 if not entered." }
            ),
          },
        },
        {
          name: "-adjoin",
          description:
            "join images into a single multi-image file (enabled by default).",
        },
        {
          name: "+adjoin",
          description: "join images into a seperate signle-image files.",
        },
        {
          name: "-affine",

          description:
            "set the drawing transformation matrix for combined rotating and scaling.",
          args: {
            name: "transformation",
            generators: commaSeparatedGenerator([
              { name: "sx", description: "scale x" },
              { name: "rx", description: "shear x" },
              { name: "ry", description: "shear y" },
              { name: "sy", description: "scale y" },
              { name: "tx", description: "translate x in pixels (optional)" },
              { name: "ty", description: "translate y in pixels (optional)" },
            ]),
          },
        },
        {
          name: "-alpha",

          description: "control the alpha/matte channel of an image.",
          args: {
            name: "alpha mode",
            generators: listGenerator("Alpha"),
          },
        },
        {
          name: "-antialias",
          description:
            "enable/disable anti-aliasing pixels when drawing fonts and lines.",
        },
        {
          name: "+antialias",
          description: "disable additional of anti-aliasing edge pixels.",
        },
        { name: "-append", description: "join current images vertically." },
        { name: "+append", description: "join current images horizontall." },
        {
          name: "-attenuate",
          description: "lessen (or intensify) when adding noise to an image.",
          args: {
            name: "value",
            description:
              "if unset the value is equivalent to 1.0, or a maximum noise addition",
          },
        },
        {
          name: "-authenticate",
          description: "decrypt a PDF with a password.",
          args: {
            name: "password",
            description:
              "a password for decrypting a PDF that has been encrypted using Microsoft Crypto API (MSC API).",
          },
        },
        {
          name: "-auto-gamma",
          description: "automatically adjust the gamma level.",
        },
        {
          name: "-auto-level",
          description: "automatically adjust the color levels.",
        },
        {
          name: "-auto-orient",
          description:
            "adjusts an image so that its orientation is suitable for viewing (i.e. top-left orientation).",
        },
        {
          name: "-auto-threshold",
          description: "automatically perform image thresholding.",
          args: {
            name: "method",
            suggestions: [
              {
                name: "undefined",
                description: "0: no method specified (equivalent to 'OTSU').",
              },
              {
                name: "kapur",
                description: "maximum entropy thresholding.",
              },
              {
                name: "otsu",
                description: "cluster-based image thresholding.",
              },
              {
                name: "triangle",
                description: "a geometric thresholding method.",
              },
            ],
          },
        },
        {
          name: "-average",
          description: "average a set of images.",
        },
        {
          name: "-backdrop",
          description: "display the image centered on a backdrop.",
        },
        {
          name: "-background",
          description: "set the background color.",
          args: colorArg,
        },
        {
          name: "-bench",
          description: "measure performance",
          args: {
            name: "iterations",
            description: "number of times to repeat the benchmark.",
          },
        },
        {
          name: "-bias",
          description: "add bias when convolving an image.",
          args: pctArg,
        },
        {
          name: "-bilateral-blur",
          description:
            "a non-linear, edge-preserving, and noise-reducing smoothing filter for images.",
          args: geometryArg,
        },
        {
          name: "-black-point-compensation",
          description: "use black point compensation.",
        },
        {
          name: "-black-threshold",
          description:
            "force to black all pixels below the threshold while leaving all pixels at or above the threshold unchanged.",
          args: pctArg,
        },
        {
          name: "-blend",
          description:
            "blend an image into another by the given absolute value or percent.",
          args: geometryArg,
        },
        {
          name: "-blue-primary",
          description: "set the blue chromaticity primary point.",
          args: {
            name: "primary point",
            generators: commaSeparatedGenerator([{ name: "x" }, { name: "y" }]),
          },
        },
        {
          name: "-blue-shift",
          description: "Simulate a scene at nighttime in the moonlight.",
          args: { name: "factor", description: "start with a factor of 1.5." },
        },
        {
          name: "-blur",
          description: "reduce image noise and reduce detail levels.",
          args: {
            name: "radius[xsigma]",
            description:
              "as a guideline, radius should be at least twice the sigma value, though three times will produce a more accurate result.",
            generators: axbGenerator({ name: "radius" }, { name: "sigma" }),
          },
        },
        {
          name: "-border",
          description: "surround the image with a border of color.",
          args: geometryArg,
        },
        {
          name: "-bordercolor",
          description: "set the border color.",
          args: colorArg,
        },
        {
          name: "-borderwidth",
          description: "set the border width.",
          args: geometryArg,
        },
        {
          name: "-brightness-contrast",
          description:
            "a brightness or contrast value of zero means no change, and the range of values is -100 to +100 on each.",
          args: {
            name: "brightness[xcontrast]",
            generators: axbGenerator(
              { name: "brightness" },
              { name: "contrast" }
            ),
          },
        },
        {
          name: "-cache",
          description: "this option has been replaced by the -limit option.",
          args: { name: "threshold" },
        },
        {
          name: "-canny",
          description:
            "canny edge detector uses a multi-stage algorithm to detect a wide range of edges in the image.",
          args: geometryArg,
        },
        {
          name: "-caption",
          description: "assign a caption to an image.",
          args: {
            name: "string",
            description:
              "If the first character of string is @, the image caption is read from a file titled by the remaining characters in the string. Comments read in from a file are literal; no embedded formatting characters are recognized.",
          },
        },
        {
          name: "-cdl",
          description: "color correct with a color decision list.",
          args: { name: "filename", template: "filepaths" },
        },
        {
          name: "-channel",
          description:
            "specify those image color channels to which subsequent operators are limited.",
          args: { name: "type", generators: channelGenerator },
        },
        {
          name: "+channel",
          description: "reset imagemagick channels to act on.",
        },
        {
          name: "-channel-fx",
          description: "exchange, extract, or copy one or more image channels.",
          args: { name: "expression", description: "" },
        },
        {
          name: "-charcoal",
          description: "simulate a charcoal drawing.",
          args: { name: "factor" },
        },
        {
          name: "-chop",
          description: "remove pixels from the interior of an image.",
          args: geometryArg,
        },
        // TODO
        {
          name: "-clahe",
          description: "contrast limited adaptive histogram equalization.",
          args: { name: "width", description: "" },
        },
        {
          name: "-clamp",
          description:
            "set each pixel whose value is below zero to zero and any the pixel whose value is above the quantum range to the quantum range (e.g. 65535) otherwise the pixel value remains unchanged.",
        },
        {
          name: "-clip",
          description: "apply the clipping path if one is present.",
        },
        {
          name: "+clip",
          description: "disable clipping for subsequent operations.",
        },
        {
          name: "-clip-mask",
          description: "clip the image as defined by this mask.",
        },
        {
          name: "+clip-mask",
          description: "disable clipping for subsequent operations.",
        },
        {
          name: "-clip-path",
          description: "clip along a named path from the 8BIM profile.",
          args: { name: "id" },
        },
        {
          name: "+clip-path",
          description: "disable clipping for subsequent operations.",
        },
        {
          name: "-clone",
          description: "make a clone of an image (or images).",
          args: {
            name: "index(s)",
            description:
              "Specify the image by its index in the sequence. The first image is index 0. Negative indexes are relative to the end of the sequence; for example, −1 represents the last image of the sequence. Specify a range of images with a dash (e.g. 0−4).",
          },
        },
        {
          name: "+clone",
          description: "equivalent to -clone -1.",
        },
        {
          name: "-clut",
          description:
            "replace the channel values in the first image using each corresponding channel in the second image as a color lookup table.",
        },
        {
          name: "-coalesce",
          description:
            "fully define the look of each frame of an GIF animation sequence, to form a 'film strip' animation.",
        },
        {
          name: "-colorize",
          description:
            "Colorize the image by an amount specified by value using the color specified by the most recent -fill setting.",
          args: {
            name: "value",
            description:
              "Specify the amount of colorization as a percentage. Separate colorization values can be applied to the red, green, and blue channels of the image with a comma-delimited list of colorization values (e.g., -colorize 0,0,50).",
            generators: commaSeparatedGenerator([
              { name: "red channel %" },
              { name: "green channel %" },
              { name: "blue channel %" },
            ]),
          },
        },
        {
          name: "-colormap",
          description: "define the colormap type.",
          args: { name: "type", suggestions: visualTypes },
        },
        {
          name: "-colors",
          description: "set the preferred number of colors in the image.",
          args: {
            name: "value",
            description:
              "the actual number of colors in the image may be less than your request, but never more.",
          },
        },
        {
          name: "-color-matrix",
          description: "apply color correction to the image.",
          // TODO: make a matrix generator
          args: {
            name: "matrix",
            generators: commaSeparatedGenerator(
              Array.from({ length: 36 }, (_, i) => ({
                name: `R${Math.trunc(i / 6) + 1}C${(i % 6) + 1}`,
              }))
            ),
          },
        },
        {
          name: "-colorspace",
          description: "set the image colorspace.",
          args: { name: "value", generators: listGenerator("Colorspace") },
        },
        {
          name: "-color-threshold",
          description:
            "return a binary image where all colors within the specified range are changed to white. All other colors are changed to black.",
          args: { name: "start-color-stop-color", description: "" },
        },
        {
          name: "-combine",
          description: "Combine one or more images into a single image.",
        },
        {
          name: "+combine",
          description: "Combine one or more images into a single image.",
          args: {
            name: "colorspace",
            generators: listGenerator("Colorspace"),
          },
        },
        {
          name: "-comment",
          description: "embed a comment in an image.",
          args: { name: "string", description: "" },
        },
        {
          name: "-compare",
          description:
            "mathematically and visually annotate the difference between an image and its reconstruction.",
        },
        {
          name: "-complex",
          description: "perform complex mathematics on an image sequence.",
          args: { name: "operator", generators: listGenerator("Complex") },
        },
        {
          name: "-compose",
          description: "set the type of image composition.",
          args: { name: "operator", generators: listGenerator("Compose") },
        },
        {
          name: "-composite",
          description:
            "perform alpha composition on two images and an optional mask.",
        },
        {
          name: "-compress",
          description:
            "use pixel compression specified by type when writing the image.",
          args: { name: "type", generators: listGenerator("Compress") },
        },
        {
          name: "+compress",
          description: "store the binary image in an uncompressed format.",
          args: { name: "type", generators: listGenerator("Compress") },
        },
        {
          name: "-connected-components",
          description: "detects connected regions in an image.",
          args: {
            name: "connectivity",
            description: "choose from 4 or 8 way connectivity.",
          },
        },
        {
          name: "-contrast",
          description: "enhance the image contrast.",
        },
        {
          name: "+contrast",
          description: "reduce the image contrast.",
        },
        {
          name: "-contrast-stretch",
          description:
            "increase the contrast in an image by stretching the range of intensity values.",
          args: {
            name: "black-point%[xwhite-point]%",
            generators: axbGenerator(
              { name: "black point %" },
              { name: "white point %" }
            ),
          },
        },
        {
          name: "-convolve",
          description:
            "convolve an image with a user-supplied convolution kernel.",
          args: {
            name: "kernel",
            description:
              "only odd-dimensioned kernels are supported (eg. 3^2=9, 5^2=25).",
          },
        },
        {
          name: "-copy",
          description: "copy pixels from one area of an image to another.",
          args: [geometryArg, { name: "offset", description: "" }],
        },
        {
          name: "-crop",
          description: "cut out one or more rectangular regions of the image.",
          // TODO since crop is special
          args: { name: "geometry", description: "" },
        },
        {
          name: "-cycle",
          description: "displace image colormap by amount.",
          args: { name: "amount", description: "" },
        },
        {
          name: "-debug",
          description: "enable debug printout.",
          // TODO: a combination of comma seperated and list generator
          args: { name: "events" },
        },
        {
          name: "+debug",
          description: "turn off all logging.",
        },
        {
          name: "-decipher",
          description:
            "decipher and restore pixels that were previously transformed by -encipher.",
          args: { name: "filename", template: "filepaths" },
        },
        {
          name: "-deconstruct",
          description: "find areas that has changed between images.",
        },
        {
          name: "-define",
          description:
            "Add specific global settings generally used to control coders and image processing operations.",
          args: { name: "key=value", description: "" },
        },
        {
          name: "-delay",
          description: "display the next image after pausing.",
          args: {
            name: "ticks",
            generators: axbGenerator(
              { name: "ticks" },
              { name: "ticks per second" }
            ),
          },
        },
        {
          name: "-delete",
          description:
            "delete the images specified by index, from the image sequence.",
          args: { name: "indexes", description: "" },
        },
        {
          name: "+delete",
          description: "delete the last image in the current image sequence.",
        },
        {
          name: "-density",
          description:
            "set the horizontal and vertical resolution of an image for rendering to devices.",
          args: {
            name: "width[xheight]",
            generators: axbGenerator({ name: "width" }, { name: "height" }),
          },
        },
        {
          name: "-depth",
          description: "depth of the image.",
          args: { name: "value", description: "" },
        },
        {
          name: "+depth",
          description: "return depth to its default value.",
        },
        {
          name: "-descend",
          description: "obtain image by descending window hierarchy.",
        },
        {
          name: "-deskew",
          description:
            "Straighten an image. A threshold of 40% works for most images.",
          args: { name: "threshold %", description: "" },
        },
        {
          name: "-despeckle",
          description: "reduce the speckles within an image.",
        },
        {
          name: "-direction",
          description:
            "Render text right-to-left or left-to-right. Requires the RAQM delegate library and complex text layout.",
          args: { name: "type", description: "" },
        },
        {
          name: "-displace",
          description: "shift image pixels as defined by a displacement map.",
          args: { name: "horizontal-scale", description: "" },
        },
        {
          name: "-display",
          description: "",
          args: { name: "host:display[.screen]", description: "" },
        },
        {
          name: "-dispose",
          description: "",
          args: { name: "method", description: "" },
        },
        {
          name: "-dissimilarity-threshold",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-dissolve",
          description: "",
          args: { name: "src_percent", description: "" },
        },
        {
          name: "-distort",
          description: "",
          args: { name: "method", generators: listGenerator("Distort") },
        },
        {
          name: "-distribute-cache",
          description: "",
          args: { name: "port", description: "" },
        },
        {
          name: "-dither",
          description: "",
          args: { name: "method", description: "" },
        },
        {
          name: "-draw",
          description: "",
          args: { name: "string", description: "" },
        },
        {
          name: "-duplicate",
          description: "",
          args: { name: "count,indexes", description: "" },
        },
        {
          name: "-edge",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-emboss",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-encipher",
          description: "",
          args: { name: "filename", template: "filepaths" },
        },
        {
          name: "-encoding",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-endian",
          description: "",
          args: { name: "type", generators: listGenerator("Endian") },
        },
        {
          name: "-enhance",
          description: "",
        },
        {
          name: "-equalize",
          description: "",
        },
        {
          name: "-evaluate",
          description: "",
          args: [
            { name: "operator", generators: listGenerator("Evaluate") },
            { name: "value" },
          ],
        },
        {
          name: "-evaluate-sequence",
          description: "",
          args: { name: "operator", generators: listGenerator("Evaluate") },
        },
        {
          name: "-extent",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-extract",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-family",
          description: "",
          args: { name: "fontFamily", description: "" },
        },
        {
          name: "-features",
          description: "",
          args: { name: "distance", description: "" },
        },
        { name: "-fft", description: "" },
        {
          name: "-fill",
          description: "",
          args: colorArg,
        },
        {
          name: "-filter",
          description: "",
          args: { name: "type", generators: listGenerator("Filter") },
        },
        {
          name: "-flatten",
          description: "",
        },
        { name: "-flip", description: "" },
        {
          name: "-floodfill",
          description: "",
          args: { name: "{", description: "" },
        },
        { name: "-flop", description: "" },
        {
          name: "-font",
          description: "",
          // TODO: needs a custom generator
          args: { name: "name", generators: "" },
        },
        {
          name: "-foreground",
          description: "",
          args: colorArg,
        },
        {
          name: "-format",
          description: "",
          // TODO: needs a custom generator
          args: { name: "string", generators: "" },
        },
        {
          name: "-frame",
          description: "",
        },
        {
          name: "-function",
          description: "",
          args: { name: "function", generators: listGenerator("Function") },
        },
        {
          name: "-fuzz",
          description: "",
          args: { name: "distance", description: "" },
        },
        {
          name: "-fx",
          description: "",
          args: { name: "expression", description: "" },
        },
        {
          name: "-gamma",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-gaussian-blur",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-geometry",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-gravity",
          description: "",
          args: { name: "type", generators: listGenerator("Gravity") },
        },
        {
          name: "-grayscale",
          description: "",
          args: { name: "method", description: "" },
        },
        {
          name: "-green-primary",
          description: "",
          args: { name: "x,y", description: "" },
        },
        {
          name: "-hald-clut",
          description: "",
        },
        { name: "-help", description: "" },
        {
          name: "-highlight-color",
          description: "",
          args: colorArg,
        },
        {
          name: "-hough-lines",
          description: "",
          args: { name: "width", description: "" },
        },
        {
          name: "-iconGeometry",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-iconic",
          description: "",
        },
        {
          name: "-identify",
          description: "",
        },
        { name: "-ift", description: "" },
        {
          name: "-illuminant",
          description: "",
          args: { name: "method", generators: listGenerator("Illuminant") },
        },
        {
          name: "-immutable",
          description: "make image immutable.",
        },
        {
          name: "-implode",
          description: "implode image pixels about the center.",
          args: { name: "factor", description: "" },
        },
        {
          name: "-insert",
          description: "Insert the last image into the image sequence.",
          args: { name: "index", description: "" },
        },
        {
          name: "-intensity",
          description: "",
          args: { name: "method", generators: listGenerator("Intensity") },
        },
        {
          name: "-intent",
          description: "",
          args: { name: "type", generators: listGenerator("Intent") },
        },
        {
          name: "-interlace",
          description: "",
          args: { name: "type", generators: listGenerator("Interlace") },
        },
        {
          name: "-interline-spacing",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-interpolate",
          description: "",
          args: { name: "type", generators: listGenerator("interpolate") },
        },
        {
          name: "-interpolative-resize",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-interword-spacing",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-kerning",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-kmeans",
          description: "",
          args: { name: "colors", description: "" },
        },
        {
          name: "-kuwahara",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-label",
          description: "",
          args: { name: "name", description: "" },
        },
        {
          name: "-lat",
          description: "",
          args: { name: "width", description: "" },
        },
        {
          name: "-layers",
          description: "",
          args: { name: "method", generators: listGenerator("Layers") },
        },
        {
          name: "-level",
          description: "",
          args: { name: "black_point", description: "" },
        },
        {
          name: "-level-colors",
          description: "",
          args: { name: "{", description: "" },
        },
        {
          name: "-limit",
          description: "",
          // TODO: needs custom generator
          args: { name: "type", generators: "" },
        },
        {
          name: "-linear-stretch",
          description: "",
          args: { name: "black-point", description: "" },
        },
        {
          name: "-linewidth",
          description: "",
        },
        {
          name: "-liquid-rescale",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-list",
          description: "",
          args: { name: "type", generators: listGenerator("List") },
        },
        {
          name: "-log",
          description: "",
          args: { name: "string", description: "" },
        },
        {
          name: "-loop",
          description: "",
          args: { name: "iterations", description: "" },
        },
        {
          name: "-lowlight-color",
          description: "",
          args: colorArg,
        },
        {
          name: "-magnify",
          description: "",
        },
        {
          name: "-map",
          description: "",
          args: { name: "components", description: "" },
        },
        {
          name: "-mattecolor",
          description: "",
          args: colorArg,
        },
        {
          name: "-maximum",
          description: "",
        },
        {
          name: "-median",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-mean-shift",
          description: "",
          args: { name: "width", description: "" },
        },
        {
          name: "-metric",
          description: "",
          args: { name: "type", generators: listGenerator("Metric") },
        },
        {
          name: "-minimum",
          description: "",
        },
        {
          name: "-mode",
          description: "",
          args: { name: "value", generators: listGenerator("Mode") },
        },
        {
          name: "-modulate",
          description: "",
          args: { name: "brightness", description: "" },
        },
        {
          name: "-moments",
          description: "",
        },
        {
          name: "-monitor",
          description: "",
        },
        {
          name: "-monochrome",
          description: "",
        },
        {
          name: "-morph",
          description: "",
          args: { name: "frames", description: "" },
        },
        {
          name: "-morphology",
          description: "",
        },
        {
          name: "kernel",
          description: "",
        },
        {
          name: "-mosaic",
          description: "",
        },
        {
          name: "-motion-blur",
          description: "",
          args: { name: "radius", description: "" },
        },
        { name: "-name", description: "" },
        {
          name: "-negate",
          description: "",
        },
        {
          name: "-noise",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "+noise",
          description: "",
          args: { name: "type", generators: listGenerator("Noise") },
        },
        {
          name: "-normalize",
          description: "",
        },
        {
          name: "-opaque",
          description: "",
          args: colorArg,
        },
        {
          name: "-ordered-dither",
          description: "",
          // TODO: custom generator since list output is irregular
          args: { name: "threshold_map", description: "" },
        },
        {
          name: "-orient",
          description: "",
          args: { name: "image", description: "" },
        },
        {
          name: "-page",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-paint",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-path",
          description: "",
          args: { name: "path", description: "" },
        },
        {
          name: "-pause",
          description: "",
          args: { name: "seconds", description: "" },
        },
        {
          name: "-perceptible",
          description: "",
          args: { name: "epsilon", description: "" },
        },
        { name: "-ping", description: "" },
        {
          name: "-pointsize",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-polaroid",
          description: "",
          args: { name: "angle", description: "" },
        },

        {
          name: "-poly",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-posterize",
          description: "",
          args: { name: "levels", description: "" },
        },
        {
          name: "-precision",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-preview",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-print",
          description: "",
          args: { name: "string", description: "" },
        },
        {
          name: "-process",
          description: "",
          args: { name: "command", description: "" },
        },
        {
          name: "-profile",
          description: "",
          args: { name: "filename", template: "filepaths" },
        },
        {
          name: "-quality",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-quantize",
          description: "",
          args: { name: "colorspace", description: "" },
        },
        {
          name: "-quiet",
          description: "",
        },
        {
          name: "-radial-blur",
          description: "",
          args: { name: "angle", description: "" },
        },
        {
          name: "-raise",
          description: "",
          args: { name: "thickness", description: "" },
        },
        {
          name: "-random-threshold",
          description: "",
          args: { name: "low", description: "" },
        },
        {
          name: "-range-threshold",
          description: "",
          args: { name: "low-black", description: "" },
        },
        {
          name: "-read-mask",
          description: "",
        },
        {
          name: "-red-primary",
          description: "",
          args: { name: "x,y", description: "" },
        },
        {
          name: "-regard-warnings",
          description: "",
        },
        {
          name: "-remap",
          description: "",
          args: { name: "filename", template: "filepaths" },
        },
        {
          name: "-region",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-remote",
          description: "",
        },
        {
          name: "-render",
          description: "",
        },
        {
          name: "-repage",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-resample",
          description: "",
          args: { name: "horizontal", description: "" },
        },
        {
          name: "-resize",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-respect-parentheses",
          description: "",
        },
        {
          name: "-reverse",
          description: "",
        },
        {
          name: "-roll",
          description: "",
          args: { name: "{", description: "" },
        },
        {
          name: "-rotate",
          description: "",
          args: { name: "degrees", description: "" },
        },
        {
          name: "-sample",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-sampling-factor",
          description: "",
          args: { name: "horizontal-factor", description: "" },
        },
        {
          name: "-scale",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-scene",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-screen",
          description: "",
        },
        { name: "-seed", description: "" },
        {
          name: "-segment",
          description: "",
          args: { name: "cluster-threshold", description: "" },
        },
        {
          name: "-selective-blur",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-separate",
          description: "",
        },
        {
          name: "-sepia-tone",
          description: "",
          args: { name: "percent-threshold", description: "" },
        },
        {
          name: "-set",
          description: "",
          args: { name: "key", description: "" },
        },
        {
          name: "-shade",
          description: "",
          args: { name: "azimuth", description: "" },
        },
        {
          name: "-shadow",
          description: "",
          args: { name: "percent-opacity", description: "" },
        },
        {
          name: "-sharpen",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-shave",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-shear",
          description: "",
          args: { name: "Xdegrees", description: "" },
        },
        {
          name: "-sigmoidal-contrast",
          description: "",
          args: { name: "contrast", description: "" },
        },
        {
          name: "-silent",
          description: "",
        },
        {
          name: "-similarity-threshold",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-size",
          description: "",
          args: { name: "width", description: "" },
        },
        {
          name: "-sketch",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-smush",
          description: "",
          args: { name: "offset", description: "" },
        },
        {
          name: "-snaps",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-solarize",
          description: "",
          args: { name: "percent-threshold", description: "" },
        },
        {
          name: "-sort-pixels",
          description: "",
        },
        {
          name: "-sparse-color",
          description: "",
          args: { name: "method", description: "" },
        },
        {
          name: "-splice",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-spread",
          description: "",
          args: { name: "amount", description: "" },
        },
        {
          name: "-statistic",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-stegano",
          description: "",
          args: { name: "offset", description: "" },
        },
        {
          name: "-stereo",
          description: "",
          args: { name: "+x", description: "" },
        },
        {
          name: "-storage-type",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-stretch",
          description: "",
          args: { name: "fontStretch", description: "" },
        },
        {
          name: "-strip",
          description: "",
        },
        {
          name: "-stroke",
          description: "",
          args: colorArg,
        },
        {
          name: "-strokewidth",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-style",
          description: "",
          args: { name: "fontStyle", description: "" },
        },
        {
          name: "-subimage-search",
          description: "",
        },
        {
          name: "-swap",
          description: "",
          args: { name: "index,index", description: "" },
        },
        {
          name: "-swirl",
          description: "",
          args: { name: "degrees", description: "" },
        },
        {
          name: "-synchronize",
          description: "",
        },
        {
          name: "-taint",
          description: "",
        },
        {
          name: "-text-font",
          description: "",
          args: { name: "name", description: "" },
        },
        {
          name: "-texture",
          description: "",
          args: { name: "filename", template: "filepaths" },
        },
        {
          name: "-threshold",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-thumbnail",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-tile",
          description: "",
          args: { name: "filename", template: "filepaths" },
        },
        {
          name: "-tile-offset",
          description: "",
          args: { name: "{", description: "" },
        },
        {
          name: "-tint",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-title",
          description: "",
          args: { name: "string", description: "" },
        },
        {
          name: "-transform",
          description: "",
        },
        {
          name: "-transparent",
          description: "",
          args: colorArg,
        },
        {
          name: "-transparent-color",
          description: "",
          args: colorArg,
        },
        {
          name: "-transpose",
          description: "",
        },
        {
          name: "-transverse",
          description: "",
        },
        {
          name: "-treedepth",
          description: "",
          args: { name: "value", description: "" },
        },
        { name: "-trim", description: "" },
        {
          name: "-type",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-undercolor",
          description: "",
          args: colorArg,
        },
        {
          name: "-update",
          description: "",
          args: { name: "seconds", description: "" },
        },
        {
          name: "-unique-colors",
          description: "",
        },
        {
          name: "-units",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-unsharp",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-verbose",
          description: "",
        },
        {
          name: "-version",
          description: "",
        },
        {
          name: "-view",
          description: "",
          args: { name: "string", description: "" },
        },
        {
          name: "-vignette",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-virtual-pixel",
          description: "",
          args: { name: "method", description: "" },
        },
        {
          name: "-visual",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-watermark",
          description: "",
          args: { name: "brightness", description: "" },
        },
        {
          name: "-wave",
          description: "",
          args: { name: "amplitude", description: "" },
        },
        {
          name: "-wavelet-denoise",
          description: "",
          args: { name: "threshold", description: "" },
        },
        {
          name: "-weight",
          description: "",
          args: { name: "fontWeight", description: "" },
        },
        {
          name: "-white-balance",
          description: "",
        },
        {
          name: "-white-point",
          description: "",
          args: { name: "x,y", description: "" },
        },
        {
          name: "-white-threshold",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-window",
          description: "",
          args: { name: "id", description: "" },
        },
        {
          name: "-window-group",
          description: "",
        },
        {
          name: "-write",
          description: "",
          args: { name: "filename", template: "filepaths" },
        },
        {
          name: "-write-mask",
          description: "",
          args: { name: "filename", template: "filepaths" },
        },
      ],
    },
  ],
  // Only uncomment if magick takes an argument
  args: {
    name: "tool",
    generators: listGenerator("Tool"),
  },
};

export default completionSpec;
