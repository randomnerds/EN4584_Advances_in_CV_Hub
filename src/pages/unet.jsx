const UNetPage = () => {
  const renderImage = (src, alt = "") => (
    <div className="my-4 flex justify-center">
      <img src={src} alt={alt} className="rounded-md border border-green-300" />
    </div>
  );

  const renderAside = (children) => (
    <div className="flex items-start space-x-3 bg-green-100 p-2 border-l-4 border-green-400 rounded-md">
      <div className="text-xl">💡</div>
      <p className="text-md">{children}</p>
    </div>
  );

  return (
    <div className="text-green-950 bg-green-200 leading-relaxed space-y-6 p-4">
      <p className="text-md text-right italic">Prepared by: Vishagar Arunan</p>

      <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-400">
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          What is the main problem addressed here?
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Deep-nets usually requires higher computational power and large
            amount of annotated datasets.
          </li>
          <li>
            The CNNs which utilizes the sliding window mechanism have drawbacks
            too
            <ul className="list-disc list-inside ml-5">
              <li>Slow as network should run for each sliding patch</li>
              <li>Lots of redundancy between overlapping patches</li>
              <li>
                Trade-off between localization accuracy and contextual
                information
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {renderAside(
        "U-Net relies on the strong use of data augmentation to use the available annotated samples more efficiently."
      )}

      {renderAside(
        "The architecture consists of a contracting path to capture context and a symmetric expanding path that enables precise localization."
      )}

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          Use of the Convolutional Neural Networks
        </h2>
        <ul className="list-disc list-inside">
          <li>
            Typical use of CNNs were restricted within the classification tasks.
          </li>
          <li>
            Many visual tasks, the desired output should include localization
            (pixelwise classification)
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          Ciresan’s sliding window network
        </h2>
        <ul className="list-disc list-inside">
          <li>
            Trained a network using a sliding window setup to predict the class
            label of the pixels by providing a local region (patch)
            <ul className="list-disc list-inside ml-5">
              <li>Can localize</li>
              <li>
                Training data in terms of patches is larger than the number of
                images.
              </li>
            </ul>
          </li>
          <li>But,</li>
          <ul className="list-disc list-inside ml-5">
            <li>Slow</li>
            <li>
              Trade-off between localization accuracy and contextual information
            </li>
          </ul>
        </ul>
        {renderImage("pages/unet/image.png")}
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Key Innovations of U-Net</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li>Usual contracting network</li>
          <li>
            Expanding path —&gt; Pooling layers are replaced by up convolutions
          </li>
          <li>
            High resolution features from contracting path are combined with
            up-sampled output (through skip connections)
          </li>
          <li>
            Therefore, high number of feature channels to propagate contextual
            information to higher resolution layers.
          </li>
        </ol>
        {renderAside("Symmetric contractive , expansive network —> U-Net")}
        <ol className="list-decimal list-inside space-y-1" start={5}>
          <li>
            Due to unpadded convolutions, output image is smaller than the input
            image.
          </li>
          <li>
            Using elastic deformations for training (to learn invariances due to
            deformations)
          </li>
          <li>
            Proposing a weighted loss to separate the background labels between
            the touching cells.
          </li>
        </ol>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Network Architecture</h2>
        {renderImage("pages/unet/image 1.png")}
        <h3 className="font-medium">Contracting path (Left)</h3>
        <ol className="list-decimal list-inside">
          <li>3x3 valid convolution</li>
          <li>3x3 valid convolution</li>
          <li>RELU</li>
          <li>Max-Pool with stride 2</li>
        </ol>
        <p className="text-xs">
          Each down-sample —&gt; double feature channels
        </p>
        <h3 className="font-medium mt-3">Expanding path (Right)</h3>
        <ol className="list-decimal list-inside">
          <li>2x2 Up convolution</li>
          <li>Concatenating network</li>
          <li>3x3 valid convolution</li>
          <li>3x3 valid convolution</li>
        </ol>
        <p className="text-xs">
          Each up-sample —&gt; half feature channels + concat
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Training</h2>
        <ul className="list-disc list-inside">
          <li>
            Input images and respective segmentation maps are used for training
          </li>
          <li>
            Favor the computational over-head, large input tiles over large
            image batch sizes.
          </li>
          <li>
            High momentum (0.99) - large number of the previously seen training
            samples determine the update in the current optimization step.
          </li>
          <li>SGD</li>
          <li>Initial weights are sampled from a Gaussian Distribution</li>
        </ul>
        <h3 className="font-medium mt-3">Loss Function</h3>
        <p>Computed by pixel-wise Softmax combined with cross entropy loss.</p>
        {renderImage("pages/unet/image 2.png")}
        <p>k - feature channel</p>
        <p>x- pixel position</p>
        <p>a_k(x) - activation of x in feature channel k</p>
        <p>p(x) - approximated maximum function</p>
        {renderImage("pages/unet/image 3.png")}
        {renderImage("pages/unet/image 4.png")}
        <p>w(x) is pre-computed</p>
        {renderImage("pages/unet/image 5.png")}
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Data Augmentation</h2>
        <ul className="list-disc list-inside">
          <li>
            Smooth deformations using random displacement vectors on a coarse
            3x3 grid.
          </li>
          <li>
            Displacements are sampled from a Gaussian distribution with 10
            pixels standard deviation.
          </li>
          <li>
            Per-pixel displacements are then computed using bicubic
            interpolation
          </li>
        </ul>
        {renderAside(
          'Instead of just rotating or flipping images, they want to **gently "bend" or "stretch"** parts of the image — like applying a soft, wavy distortion.'
        )}
        <pre className="bg-green-100 p-3 rounded-md text-sm overflow-auto">
          {`1. Create a 3x3 grid
2. Add random displacements
3. Using bicubic interpolation to spread all over the images
4. drop-out at the bottom of u-net`}
        </pre>
        {renderImage("pages/unet/image 6.png")}
      </div>
    </div>
  );
};

export default UNetPage;
