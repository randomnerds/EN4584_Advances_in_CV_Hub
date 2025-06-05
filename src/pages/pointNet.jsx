const PointNetPage = () => {
  const renderImage = (src, alt = "") => (
    <div className="my-4 flex justify-center">
      <img src={src} alt={alt} className="rounded-md border border-green-300" />
    </div>
  );

  const renderAside = (children) => (
    <div className="flex items-start space-x-3 bg-green-100 p-2 border-l-4 border-green-400 rounded-md">
      <div className="text-xl">💡</div>
      <div className="text-md">{children}</div>
    </div>
  );

  return (
    <div className="text-green-950 bg-green-200 leading-relaxed space-y-6 p-4">
      <p className="text-md text-right italic">Prepared by: Vishagar Arunan</p>

      <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-400">
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          1. Introduction & Problem Statement
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Problem:</strong> Point clouds are an important type of
            geometric data structure but have an{" "}
            <strong>irregular format</strong>.
            <ul className="list-disc list-inside ml-5">
              <li>
                Traditional approaches utilized deep learning architectures
                (like CNNs) through changing the unordered point clouds to an
                ordered formal like 3D voxels or images.
              </li>
              <li>
                This transformation is problematic because it renders data
                unnecessarily (Computational Overhead) and introduces{" "}
                <strong>quantization artifacts</strong> that can obscure natural
                invariances.
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {renderAside(
        <>
          <strong>Goal:</strong> Design a novel neural network that{" "}
          <strong>directly consumes point clouds</strong>.
        </>
      )}

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">2. PointNet</h2>
        <ul className="list-disc list-inside">
          <li>Direct Point Cloud Consumption & Permutation Invariance</li>
          <li>
            PointNet provides a unified architecture for various applications
            learning both local and global features for Object classification
            and semantic/ part classification.
          </li>
          <li>
            PointNet is surprisingly simple, highly efficient (faster), scalable
            (O(N) computational) and effective(SOTA).
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          3. PointNet Architecture Details (Key Modules)
        </h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Input Format:</strong> A set of 3D points, where each point
            Pi is a vector of its (x, y, z) coordinates. Additional features
            like color or normals can be added.
          </li>
          <li>
            <strong>Basic Architecture:</strong> In the initial stages,{" "}
            <strong>
              each point is processed identically and independently
            </strong>{" "}
            (e.g., by shared MLPs).
          </li>
          <li>
            <strong>Max Pooling as the Symmetric Function:</strong> Takes 'n'
            vectors as input and outputs a new vector that is{" "}
            <strong>invariant to the input order</strong>.
          </li>
        </ul>

        {renderAside(
          <>
            <strong>Why we need a symmetric function?</strong> To learn
            permutation invariance.
            <ul className="list-disc list-inside ml-4">
              <li>
                The network{" "}
                <strong>
                  learns a set of optimization functions/criteria that select
                  interesting or informative points
                </strong>{" "}
                of the point cloud.
              </li>
              <li>
                <strong>Comparison to alternatives:</strong> Sorting (unstable
                in high dimensions, doesn't fully resolve order issue) and RNNs
                (order matters, hard to scale to thousands of elements)
                performed poorly compared to max pooling.
              </li>
              <li>
                Other symmetric functions like average pooling and
                attention-based weighted sum also performed worse than max
                pooling.
              </li>
            </ul>
          </>
        )}

        <ul className="list-disc list-inside">
          <li>
            <strong>
              Local and Global Information Combination (for Segmentation):
            </strong>{" "}
            For point segmentation,{" "}
            <strong>local and global knowledge are combined</strong>. The{" "}
            <strong>
              global point cloud feature vector is concatenated back to
              per-point features
            </strong>
            .
          </li>
          <li>
            <strong>Joint Alignment Networks (T-Nets):</strong> The semantic
            labeling of a point cloud should be{" "}
            <strong>invariant to geometric transformations</strong> (e.g., rigid
            transformations like rotation and translation).
          </li>
          <li>
            PointNet predicts an <strong>affine transformation matrix</strong>{" "}
            using a mini-network (T-Net).
          </li>
          <li>
            This idea is{" "}
            <strong>extended to align features in the feature space</strong>{" "}
            (feature transform).
          </li>
          <li>
            A <strong>regularization term</strong> is added to constrain the
            feature transformation matrix to be{" "}
            <strong>close to an orthogonal matrix</strong>, which prevents
            information loss and improves optimization stability and
            performance. (Orthogonal transformation reflects almost a perfect
            rotation)
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">4. Theoretical Analysis</h2>

        <ul className="list-disc list-inside">
          <li>
            <strong>Universal Approximation:</strong>
          </li>
        </ul>

        {renderImage("pages/pointnet/image.png")}

        <p>
          Theorem 1 states that any continuous set function 'f' can be
          arbitrarily approximated by <code>γ(MAX (xi))</code>, where 'h' is a
          continuous function, 'γ' is a continuous function, and MAX is an
          element-wise maximum operator.
        </p>
        <ul className="list-disc list-inside">
          <li>
            This implies the network can learn to probe the space intelligently,
            rather than just converting to volumetric representations.
          </li>
          <li>
            <strong>Bottleneck Dimension and Stability:</strong>
          </li>
        </ul>

        {renderImage("pages/pointnet/image%201.png")}

        <ul className="list-disc list-inside">
          <li>
            The expressiveness of the network is affected by the dimension of
            the max pooling layer (K).
          </li>
          <li>
            Theorem 2 implies that the function f(S) (the network's output) is{" "}
            <strong>
              determined by a finite subset of points, C<sub>S</sub>
            </strong>
            , which is less than or equal to K elements.
          </li>
          <li>
            <strong>
              C<sub>S</sub> is called the "critical point set"
            </strong>{" "}
            and K is the "bottleneck dimension".
          </li>
          <li>
            This explains the{" "}
            <strong>
              robustness of PointNet to small perturbation, corruption
              (outliers), and deletion (missing data)
            </strong>{" "}
            of input points.
          </li>
          <li>
            The robustness is gained by an analogy to the sparsity principle in
            machine learning.
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">5. Time and Space Complexity</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Highly efficient:</strong> PointNet is orders of magnitude
            more efficient in computational cost (FLOPs/sample) compared to
            volumetric (Subvolume) and multi-view (MVCNN) architectures.
          </li>
          <li>
            e.g., <strong>141x more efficient than MVCNN</strong> and{" "}
            <strong>8x more efficient than Subvolume</strong> in FLOPs/sample.
          </li>
          <li>
            <strong>Space efficient:</strong> Has significantly fewer parameters
            (e.g., <strong>17x less than MVCNN</strong>).
          </li>
          <li>
            <strong>Scalable:</strong> Time and space complexity are{" "}
            <strong>O(N), linear in the number of input points</strong>, unlike
            volumetric methods that grow cubically with volume size or
            multi-view methods that grow squarely with image resolution.
          </li>
          <li>
            <strong>Real-time potential:</strong> Capable of processing over a
            million points per second for classification or semantic
            segmentation on a GPU.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PointNetPage;
