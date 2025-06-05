const IntroductionToComputerVision = () => {
  return (
    <div className="text-green-700 leading-relaxed space-y-6">
      {/* Introduction Section */}
      <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-400">
        <h2 className="text-xl font-semibold text-green-800 mb-3">
          What is Computer Vision?
        </h2>
        <p className="mb-3">
          Computer vision is a field of artificial intelligence that trains
          computers to interpret and understand the visual world. From images
          and videos, computers can identify and classify objects and then react
          to them.
        </p>
        <p>
          This interdisciplinary field draws from computer science, mathematics,
          and engineering to create systems that can process, analyze, and
          understand visual information.
        </p>
      </div>

      {/* Key Concepts Section */}
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h2 className="text-xl font-semibold text-green-800 mb-3">
          Key Concepts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-100 p-3 rounded-md">
            <h3 className="font-medium text-green-700 mb-2">
              Image Processing
            </h3>
            <p className="text-sm">
              Techniques for enhancing, filtering, and transforming digital
              images to improve their quality or extract useful information.
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded-md">
            <h3 className="font-medium text-green-700 mb-2">
              Feature Detection
            </h3>
            <p className="text-sm">
              Methods to identify distinctive patterns, edges, corners, and
              other important visual elements within images.
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded-md">
            <h3 className="font-medium text-green-700 mb-2">
              Pattern Recognition
            </h3>
            <p className="text-sm">
              Algorithms that can identify regularities and classify visual
              patterns into predefined categories.
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded-md">
            <h3 className="font-medium text-green-700 mb-2">
              Machine Learning
            </h3>
            <p className="text-sm">
              Training algorithms to automatically learn and improve from visual
              data without being explicitly programmed.
            </p>
          </div>
        </div>
      </div>

      {/* Applications Section */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">
          Real-World Applications
        </h2>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <h3 className="font-medium text-blue-700">Medical Imaging</h3>
              <p className="text-sm text-blue-600">
                Analyzing X-rays, MRIs, and CT scans for disease diagnosis and
                treatment planning.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <h3 className="font-medium text-blue-700">Autonomous Vehicles</h3>
              <p className="text-sm text-blue-600">
                Object detection, lane recognition, and traffic sign
                identification for self-driving cars.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <h3 className="font-medium text-blue-700">
                Security & Surveillance
              </h3>
              <p className="text-sm text-blue-600">
                Facial recognition, motion detection, and behavioral analysis
                for security systems.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <h3 className="font-medium text-blue-700">
                Manufacturing Quality Control
              </h3>
              <p className="text-sm text-blue-600">
                Automated inspection of products for defects and quality
                assurance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Pipeline Section */}
      <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
        <h2 className="text-xl font-semibold text-yellow-800 mb-3">
          Computer Vision Pipeline
        </h2>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div>
              <span className="font-medium text-yellow-700">
                Image Acquisition
              </span>
              <p className="text-sm text-yellow-600">
                Capturing visual data through cameras or sensors
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div>
              <span className="font-medium text-yellow-700">Preprocessing</span>
              <p className="text-sm text-yellow-600">
                Noise reduction, normalization, and enhancement
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div>
              <span className="font-medium text-yellow-700">
                Feature Extraction
              </span>
              <p className="text-sm text-yellow-600">
                Identifying relevant visual features and patterns
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              4
            </div>
            <div>
              <span className="font-medium text-yellow-700">
                Analysis & Recognition
              </span>
              <p className="text-sm text-yellow-600">
                Processing features to make decisions or classifications
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Summary</h2>
        <p className="text-gray-700">
          Computer vision represents a crucial intersection of artificial
          intelligence and visual perception, enabling machines to understand
          and interact with the visual world. As technology advances, computer
          vision continues to revolutionize industries from healthcare to
          transportation, making automated visual understanding an essential
          component of modern AI systems.
        </p>
      </div>
    </div>
  );
};
export default IntroductionToComputerVision;
