const TrackingPaperPage = () => {
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
      <p className="text-md text-right italic">
        Prepared by: Hashiru Pramuditha
      </p>

      <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-400">
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          1. Introduction
        </h2>
        <p>
          The paper addresses the problem of tracking multiple objects in video
          sequences, a task complicated by object re-identification, motion
          prediction, and occlusions. The study introduces a tracker that
          doesn't specifically target these tasks, requiring no training or
          optimization on tracking data. It leverages the bounding box
          regression of an object detector to predict an object's position in
          the next frame, effectively turning a detector into a tracker
          (Tracktor).
        </p>
        <h3 className="text-lg font-semibold text-green-700 mt-4 mb-2">
          Main Contributions
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Introducing the Tracktor</strong>, which uses the regression
            head of a detector for temporal realignment of object bounding
            boxes.
          </li>
          <li>
            <strong>Presenting two simple extensions to Tracktor</strong>: a
            re-identification Siamese network and a motion model.
          </li>
          <li>
            <strong>Conducting a detailed analysis</strong> of failure cases and
            challenging tracking scenarios. Proposing the method as a new
            tracking paradigm that exploits the detector and allows researchers
            to focus on complex tracking challenges.
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">2. Related Work</h2>
        <p>
          Several computer vision tasks rely on object trajectories as input.
          Despite extensive research, multi-object tracking remains challenging,
          especially in crowded environments.
        </p>
        <p>
          Most state-of-the-art works follow the{" "}
          <strong>tracking-by-detection paradigm</strong>, heavily relying on
          the performance of the underlying detection method.
        </p>
      </div>

      <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-400">
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          3. Tracking as a Graph Problem
        </h2>
        <p>
          The data association problem involves maintaining the identity of
          tracked objects given available detections, which can be approached
          frame by frame or track-by-track. Representing the problem as a graph
          is a common formalism:
        </p>
        {renderImage(
          "pages/tracktor/image.png",
          "Graph representation of tracking problem"
        )}
      </div>

      <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-400">
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          4. Appearance Models and Re-identification
        </h2>
        <p>
          Discriminating and re-identifying objects by appearance is a
          challenge, especially in crowded scenes with occlusions. Color-based
          models are commonly used but can be unreliable due to similar clothing
          and illumination changes.
        </p>
        <p>
          To improve object detection and tracking, visual similarity and motion
          consistency between detection instances are analyzed to predict if
          they belong to the same track.
        </p>
      </div>

      <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-400">
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          5. Motion Models and Trajectory Prediction
        </h2>
        <p>
          Motion is used to discriminate between pedestrians, especially in
          crowded scenes. The{" "}
          <strong>constant velocity assumption (CVA)</strong> is common, but
          more complex models like the Social Force Model are used for crowded
          scenarios. Deep Learning is also used to learn social etiquette for
          trajectory prediction.
        </p>
      </div>

      <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-400">
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          6. Video Object Detection
        </h2>
        <p>
          Multi-object tracking without frame-to-frame identity prediction is
          referred to as video object detection. Methods exploit spatio-temporal
          consistencies of object positions to improve detections.
        </p>
      </div>

      <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-400">
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          7. A Detector Is All You Need
        </h2>
        <p>
          The paper proposes converting a detector into a Tracktor for
          multi-object tracking by exploiting the bounding box refinement
          through regression. This approach has{" "}
          <strong>two key advantages</strong>: it requires no tracking-specific
          training and performs no complex optimization at test time, making it
          an online tracker.
        </p>

        <h3 className="text-lg font-semibold text-green-700 mt-4 mb-2">
          Object Detector
        </h3>
        <p>
          The core element of the tracking pipeline is a regression-based
          detector. In this case, a{" "}
          <strong>
            Faster R-CNN with ResNet-101 and Feature Pyramid Networks (FPN)
          </strong>{" "}
          is trained on the MOT17Det pedestrian detection dataset.
        </p>
        {renderImage(
          "pages/tracktor/image 1.png",
          "Object detector architecture"
        )}
      </div>

      <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-400">
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          8. Tracktor
        </h2>
        {renderImage(
          "pages/tracktor/image 2.png",
          "Tracktor process visualization"
        )}

        <p>
          The challenge of multi-object tracking is to extract the spatial and
          temporal positions (trajectories) of objects in a video sequence. A
          trajectory is defined as a list of ordered object bounding boxes,
          where a bounding box is defined by its coordinates b_kt = (x, y, w,
          h), and t represents a frame of the video.
        </p>

        <p>
          The image provides a visual guide to the Tracktor process, using a
          flowchart and real-world images of a train station to show how objects
          are tracked, even when occluded.
        </p>

        <p>
          At t = 0, the tracker initializes tracks from the first set of
          detections. For a given frame t for all t greater than 0, the method
          involves two processing steps:
        </p>

        {renderAside(
          <>
            <div className="space-y-2">
              <p>
                <strong>Bounding box regression:</strong> The bounding box of
                frame t-1 is regressed to the object's new position at frame t.
                In Faster R-CNN, this corresponds to applying RoI pooling on the
                features of the current frame with the previous bounding box
                coordinates.
              </p>
              <p>
                <strong>Bounding box initialization:</strong> The object
                detector provides detections D_t for the entire frame t. A
                detection from D_t starts a trajectory only if the Intersection
                over Union (IoU) with any of the already active trajectories is
                smaller than lambda.
              </p>
            </div>
          </>
        )}

        {renderImage("pages/tracktor/image 3.png", "Tracktor process steps")}
      </div>

      <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-400">
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          9. Tracking Extensions
        </h2>
        <p>Two extensions to the Tracktor are presented:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Motion Model</strong>
          </li>
          <li>
            <strong>Re-identification</strong>
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-green-700 mt-4 mb-2">
          Motion Model
        </h3>
        <p>
          To address scenarios where the position of an object changes
          significantly between frames due to camera motion or low frame rates,
          two types of motion models are applied. For sequences with a moving
          camera, <strong>camera motion compensation (CMC)</strong> is applied
          by aligning frames via image registration. For sequences with low
          frame rates, a <strong>constant velocity assumption (CVA)</strong> is
          used.
        </p>

        <h3 className="text-lg font-semibold text-green-700 mt-4 mb-2">
          Re-identification
        </h3>
        <p>
          Short-term re-identification (reID) based on appearance vectors
          generated by a <strong>Siamese neural network</strong> is used to keep
          the tracker online. Deactivated tracks are stored, and their distance
          in the embedding space is compared with newly detected tracks.
        </p>
      </div>

      <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-400">
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          10. Experiments
        </h2>
        <p>
          The tracking performance of the Tracktor tracker and its extension{" "}
          <strong>Tracktor++</strong> are demonstrated on several datasets
          focusing on pedestrian tracking.
        </p>

        <h3 className="text-lg font-semibold text-green-700 mt-4 mb-2">
          Ablation Study
        </h3>
        {renderImage("pages/tracktor/image 4.png", "Ablation study results")}
      </div>

      <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-400">
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          11. Benchmark Evaluation
        </h2>
        <p>
          The Tracktor++ tracker's performance was evaluated on a benchmark test
          set without any training or optimization on the tracking train set.
          The results were accumulated over all sequences, and for MOT17, across
          all three sets of public detections. Only officially published and
          peer-reviewed entries in the MOTChallenge benchmark were considered
          for comparison.
        </p>

        <p>
          For all sequences, camera motion compensation (CMC) and
          re-identification (reID) were used. For the low frame rate sequence,
          2D MOT 2015 AVGTownCentre, the constant velocity assumption (CVA) was
          applied. For the two autonomous driving sequences from the KITTI
          benchmark, both rotation and translation camera motion compensation
          were used. The same Tracktor++ tracker, trained on MOT17Det object
          detections, was used for all benchmarks, achieving a{" "}
          <strong>
            new state-of-the-art in terms of MOTA on all three challenges
          </strong>
          .
        </p>

        <p>
          The results on MOT16 demonstrate the tracker's ability to cope with
          detections of comparatively minor performance. The tracker outperforms
          others on MOT16 by a large margin, specifically in terms of{" "}
          <strong>false negatives (FN) and identity preserving (IDF1)</strong>.
          A new state-of-the-art was also achieved on 2D MOT 2015, without using
          MOT15 training sequences, illustrating the generalization strength of
          the tracker.
        </p>
      </div>

      <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-400">
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          12. Towards a New Tracking Paradigm
        </h2>
        <p>
          Two approaches are proposed on how to utilize Tracktor as a starting
          point for future research directions:
        </p>

        <ul className="list-disc list-inside space-y-2 mt-2">
          <li>
            <strong>Tracktor with extensions:</strong> Apply Tracktor to a given
            set of detections and extend it with tracking specific methods.
            Scenarios with large and highly visible objects will be covered by
            the frame to frame bounding box regression. For the remaining, it
            seems most promising to implement a hallucinating motion model,
            taking into account the individual movements of objects. In
            addition, such a motion predictor reduces the necessity for an
            advanced killing policy.
          </li>
          <li>
            <strong>Tracklet generation:</strong> Analogous to
            tracking-by-detection, a tracking-by-tracklet approach is proposed.
            Many algorithms already use tracklets as input, as they are richer
            in information for computing motion or appearance models. Tracklets
            can be created using the detector itself to create frame to frame
            tracklets. The remaining complex tracking cases ought to be tackled
            by a subsequent tracking method.
          </li>
        </ul>
      </div>

      <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-400">
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          13. Tracking Extensions Details
        </h2>
        <p>
          The Tracktor++ tracker is an extension of the Tracktor that uses two
          multi-pedestrian tracking specific extensions:
        </p>

        <ul className="list-disc list-inside space-y-2 mt-2">
          <li>
            <strong>Motion Model:</strong> Camera motion compensation (CMC) is
            applied using image registration with Enhanced Correlation
            Coefficient (ECC) maximization. Image registration allows for
            euclidean or affine image alignment. The first is applied for
            rotating camera movements, and the affine transformation is used in
            the case of an additional camera translation. A second motion model
            aims at facilitating the regression for sequences with low frame
            rates by shifting bounding boxes in the direction of their previous
            velocity using the constant velocity assumption (CVM) model.
          </li>
          <li>
            <strong>Re-identification:</strong> Short-term re-identification
            utilizes a <strong>Siamese neural network</strong> to compare
            bounding box features and return a measure of their identity. The{" "}
            <strong>TriNet architecture</strong> is trained with the triplet
            loss and batch hard strategy. Training samples with corresponding
            identity are generated from the MOT17 tracking ground truth training
            data. The TriNet architecture requires input data with a dimension
            of H × W = 256 × 128.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-green-700 mt-4 mb-2">
          Re ID Training Process
        </h3>
        {renderImage(
          "pages/tracktor/image 5.png",
          "Re-identification training process"
        )}
      </div>

      {renderAside(
        <>
          <strong>Key Insight:</strong> This paper demonstrates that
          sophisticated tracking algorithms may not always be necessary - a
          well-designed detector can serve as an effective tracker by leveraging
          its regression capabilities for temporal alignment.
        </>
      )}
    </div>
  );
};

export default TrackingPaperPage;
