const affineTransformGenerator: Fig.Generator = {
  script: function (context) {
    return `echo ${context}`;
  },
  postProcess: function (transform) {
    const transforms = ["sx", "rx", "ry", "sy", "tx", "ty"];
    const i = transform.split(",").filter((d) => d).length;
    return [{ name: transforms[i] }];
  },
  trigger: ",",
};

const IMAGE_SETTINGS_ICON = "⚙️";

const imageSettings = [
  {
    name: "-adjoin",
    description:
      "join images into a single multi-image file (enabled by default).",
    icon: IMAGE_SETTINGS_ICON,
  },
  {
    name: "+adjoin",
    description: "join images into a seperate signle-image files.",
    icon: IMAGE_SETTINGS_ICON,
  },
  {
    name: "-affine",
    description:
      "set the drawing transformation matrix for combined rotating and scaling.",
    args: { name: "transformation", generators: affineTransformGenerator },
    icon: IMAGE_SETTINGS_ICON,
  },
  {
    name: "-alpha",
    description: "control the alpha/matte channel of an image.",
    icon: IMAGE_SETTINGS_ICON,
    args: {
      name: "alpha mode",
      suggestions: [
        {
          name: "activate",
          description: "enable the transparency channel.",
        },
        {
          name: "associate",
          description: "associate the alpha channel with this image.",
        },
        {
          name: "deactivate",
          description: "disable the transparency channel.",
        },
        {
          name: "disassociate",
          description: "disassociate the alpha channel with this image.",
        },
        {
          name: "set",
          description:
            "activate the alpha/matte channel and resets to opaque if it was previously off.",
        },
        {
          name: "opaque",
          description:
            "Enable the alpha/matte channel and forces it to be fully opaque.",
        },
      ],
    },
  },
];

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
      options: [...imageSettings],
    },
  ],

  // Only uncomment if magick takes an argument
  // args: {}
};

export default completionSpec;
