# AquaQuantum 🐟🔬

**AquaQuantum** is a hybrid AI-powered mobile app for identifying fish species using a Convolutional Neural Network (CNN) enhanced with a Quantum Neural Network (QNN). It provides real-time classification, geotagging, and scan history via a user-friendly mobile interface powered by React Native and Expo.

> 💡 Built with PyTorch, PennyLane, FastAPI, and Expo (React Native)

---

## 📱 Features

- 📷 **Camera-based Capture**: Use your device camera to capture fish images.
- ⚛️ **Quantum Hybrid Classifier**: Combines EfficientNet-B0 CNN with a 4-qubit Quantum Neural Network.
- 🗺️ **Geotagging**: Saves location data of each scan if permission is granted.
- 📖 **Scan History**: Stores all classified images with metadata.
- 🧭 **Map Visualization**: Visualize previous scans pinned on a map.
- 📊 **Statistics Dashboard**: Displays total scans and unique species count.
- 📘 **Interactive Help Guide**: Easily understand app functionality.
- 🔗 **Backend API**: Built with FastAPI to serve a quantum-enhanced classification model.
- 🧪 **Supports Offline History Storage**: Uses local device storage.

---

## 🛠️ Installation & Setup

### 📦 Backend (Quantum Hybrid Model Server)

1. Install dependencies:
```bash
pip install torch torchvision torchaudio
pip install pennylane pennylane-lightning
pip install matplotlib scikit-learn tqdm fastapi uvicorn
```
2. Run the server:
```bash
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```
Ensure the model weights (hybrid_qcnn_model_v1.0.pth) and species_mapping.json are in the same directory.

## 📱 Mobile App (Expo/React Native)
1. Install dependencies:

```bash
npm install
```
2. Start the app:
```bash
npx expo start
```
3. Required Configuration:
 
   - Update the IP under API_URLS.dev to match your local network server IP.

4. Permissions Required:

   - Camera access

   - Location access (optional but enhances experience)

## 🚀 How to Use
1. Launch the App – The splash screen leads to the Home.

2. Start a Scan – Navigate to the camera, capture an image.

3. Receive Analysis – Image is classified by the backend model and metadata is recorded.

4. View Results:

- 🗂️ History Tab: Review your past scans

- 🗺️ Map Tab: Explore geolocated results

5. Use Help Tab – Get user guidance at any time.

## 📈 Planned Improvements
- ✅ Replace dummy classification on frontend with live API prediction.

- 🧠 Improve QNN architecture and extend quantum layers.

- ☁️ Deploy FastAPI on cloud or use tunneling for public access.

- 📲 Expand iOS support and responsive design.

- 📤 Add user account integration for sync and backup.

- 🔍 Add filtering options in history view.

## 👨‍🎓 Academic Notice
This project is developed as part of a final year Synoptic Project. It explores quantum-enhanced machine learning using PennyLane and PyTorch and serves as a demonstrator for hybrid quantum-classical pipelines applied in real-world mobile environments.

## 👨‍💻 Author
**Name:** Amar Mukhtar Mohammed

**Institution:** The Manchester Metropolitan University

**Course:** B.Sc Computer Science

**Supervisors:** Dr. Kate MacFarlane & Dr. Matthew Shardlow

## 📂 Project Directory Structure

```plaintext  
├── Home Server/  
│   ├── server.py               → FastAPI server for classification  
│   ├── hybrid_qcnn_model_v1.0.pth  → Trained PyTorch model  
│   ├── species_mapping.json    → ID to species name map  

├── Expo React Native App/  
│   ├── AppNavigator.js         → App routing and screens  
│   ├── CameraScreen.js         → Main scan/capture logic  
│   ├── HistoryScreen.js        → Saved results viewer  
│   ├── MapScreen.js            → Geotag visualization  
│   ├── HelpScreen.js           → Help and usage instructions  
│   ├── api.js                  → Image upload and classification request  
│   ├── HomeScreen.js           → Dashboard with stats and navigation  
│   ├── SplashScreen.js         → Intro loading screen  

```

## 🧪 Example API Usage
- Endpoint: POST /predict/
- Payload: JPEG image
Response:

```json
{
  "class_id": 12,
  "class_name": "Rainbow Trout",
  "confidence": 98.73
}
```

## 🧠 Tech Stack
- Frontend: React Native + Expo

- Backend: FastAPI, PyTorch, PennyLane

- Quantum Engine: PennyLane Lightning

- Model: EfficientNet-B0 + BasicEntanglerLayers

- Storage: AsyncStorage (local)

- Map: react-native-maps

## 📸 Screenshots

> Disclaimer: The data shown in the screenshots below is dummy data and used for demonstration purposes only. 

### 🔍 Home View 
<img src="screenshots/Screenshot7.png" width="300"/>  
<img src="screenshots/Screenshot2.png" width="300"/>

### 🧾 Camera View
<img src="screenshots/Screenshot3.png" width="300"/>  
<img src="screenshots/Screenshot4.png" width="300"/>

### 🗺️ Map View
<img src="screenshots/Screenshot8.jpg" width="300"/>

### 🧾 History Log
<img src="screenshots/Screenshot5.png" width="300"/>


## 📜 License
This is a student research project. Not for commercial use. The project was developed in full compliance with MMU academic integrity policies,




