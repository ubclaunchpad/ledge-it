from cgi import print_exception
import pytesseract
import cv2
import numpy as np
import re

img = cv2.imread('receipt4.jpg')

DEBUG = False

#Adding custom options for tesseract
custom_config = r'--oem 3 --psm 6'
pytesseract.image_to_string(img, config=custom_config)

#Preprocess image to increase accuracy
# get grayscale image
def get_grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# noise removal
def remove_noise(image):
    return cv2.medianBlur(image,5)
 
#thresholding
def thresholding(image):
    return cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

#dilation
def dilate(image):
    kernel = np.ones((5,5),np.uint8)
    return cv2.dilate(image, kernel, iterations = 1)
    
#erosion
def erode(image):
    kernel = np.ones((5,5),np.uint8)
    return cv2.erode(image, kernel, iterations = 1)

#opening - erosion followed by dilation
def opening(image):
    kernel = np.ones((5,5),np.uint8)
    return cv2.morphologyEx(image, cv2.MORPH_OPEN, kernel)

#canny edge detection
def canny(image):
    return cv2.Canny(image, 100, 200)

#skew correction
def deskew(image):
    coords = np.column_stack(np.where(image > 0))
    angle = cv2.minAreaRect(coords)[-1]
    if angle < -45:
        angle = -(90 + angle)
    else:
        angle = -angle
    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
    return rotated

#template matching
def match_template(image, template):
    return cv2.matchTemplate(image, template, cv2.TM_CCOEFF_NORMED) 


gray = get_grayscale(img)
if DEBUG:
    cv2.imshow("Gray image",gray)
    cv2.waitKey(0)

thresh = thresholding(gray)
if DEBUG:
    cv2.imshow("Threshholded image",thresh)
    cv2.waitKey(0)

opening = opening(gray)
if DEBUG:
    cv2.imshow("Eroded+dilated image",opening)
    cv2.waitKey(0)

canny = canny(gray)
if DEBUG:
    cv2.imshow("Edge detected image",canny)
    cv2.waitKey(0)

text_from_image = pytesseract.image_to_string(
	cv2.cvtColor(gray, cv2.COLOR_BGR2RGB),
	config=custom_config)

print("===========ALL PARSED TEXT=============")
print(text_from_image)

#Arbitrary classifications  from receipt
merchant_name = text_from_image.split("\n")[0]
merchant_address = text_from_image.split("\n")[1:3]

print("Merchant name: ",merchant_name)
print("Merchant address: ",merchant_address)

# regular expression that will match line items that include a price component
pricePattern = r'([0-9]+\.[0-9]+)'
pricePattern2 = r'([0-9]+\,[0-9]+)'
# show the output of filtering out *only* the line items in the receipts
print("\n===========TRYING OUT REGEX=============")
# loop over each of the line items in the OCR'd receipt
for row in text_from_image.split("\n"):
	# check to see if the price regular expression matches the current
	# row
	if ((re.search(pricePattern, row) is not None) or (re.search(pricePattern2, row) is not None)):
		print(row)



