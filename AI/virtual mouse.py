import cv2
import mediapipe as mp
import pyautogui
import os

BaseOptions = mp.tasks.BaseOptions
GestureRecognizer = mp.tasks.vision.GestureRecognizer
GestureRecognizerOptions = mp.tasks.vision.GestureRecognizerOptions
GestureRecognizerResult = mp.tasks.vision.GestureRecognizerResult
VisionRunningMode = mp.tasks.vision.RunningMode

screen_width, screen_height = pyautogui.size()

model_directory = os.path.dirname(os.path.abspath(__file__))
model_path=f'{model_directory}\\gesture_recognizer.task'

def handle_result(
    result: GestureRecognizerResult, output_image: mp.Image, timestamp_ms: int
):
    if result.gestures:
        gesture = result.gestures[0][0].category_name
        print(gesture)

        if gesture == "Pointing_Up":
            if result.hand_landmarks:
                landmark = result.hand_landmarks[0][8]
                # Map the normalized x and y coordinates to the screen resolution
                mouse_x = int(landmark.x * screen_width)
                mouse_y = int(landmark.y * screen_height)
                pyautogui.moveTo(mouse_x, mouse_y, duration=0.1)

        if gesture == "Thumb_Up":
            pyautogui.scroll(200)

        if gesture == "Thumb_Down":
            pyautogui.scroll(-200)

        if gesture == "Victory":
            pyautogui.click()

        if gesture == "Closed_Fist":
            pyautogui.doubleClick()
            pyautogui.sleep(1)


options = GestureRecognizerOptions(
    base_options=BaseOptions(
        model_asset_path= model_path
    ),
    running_mode=VisionRunningMode.LIVE_STREAM,
    result_callback=handle_result,
)
recognizer = GestureRecognizer.create_from_options(options)

cap = cv2.VideoCapture(0)
frame_timestamp_ms = 0
while True:
    _, frame = cap.read()
    frame = cv2.flip(frame, 1)
    frame_height, frame_width, _ = frame.shape
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame)

    # Recognize gestures in the input image.
    frame_timestamp_ms += 1
    recognition_result = recognizer.recognize_async(mp_image, frame_timestamp_ms)

    cv2.imshow("Virtual Mouse", frame)
    cv2.waitKey(100)
