
// =====================================
// SMARTSCAN-AI
// Camera Object Scanner
// =====================================


// Get HTML elements

const camera = document.getElementById("camera");

const canvas = document.getElementById("canvas");

const capturedImage = document.getElementById("capturedImage");

const placeholder = document.getElementById("placeholder");

const statusText = document.getElementById("status");

const objectName = document.getElementById("objectName");

const startButton = document.getElementById("startButton");

const captureButton = document.getElementById("captureButton");

const scanButton = document.getElementById("scanButton");

const resetButton = document.getElementById("resetButton");

const fileInput = document.getElementById("fileInput");


// Store camera stream and image data

let stream = null;

let imageData = null;

// =====================================
// OBJECT INFORMATION DATABASE
// =====================================
    const objectInformation = {

    // =========================
    // ELECTRONICS & TECHNOLOGY
    // =========================

    "cell phone": {
        category: "Electronics",
        description: "A mobile device used for communication, internet access, photography and digital activities.",
        advantages: "Portable, supports communication and provides quick access to information.",
        disadvantages: "Requires charging, can be distracting and depends on connectivity for many functions.",
        uses: "Making calls, sending messages, browsing the internet, taking photos and using apps."
    },

    "laptop": {
        category: "Electronics",
        description: "A portable computer with a screen, keyboard and rechargeable battery.",
        advantages: "Portable, versatile and useful for learning, work and digital tasks.",
        disadvantages: "Requires charging, can be expensive to repair and may become slow over time.",
        uses: "Studying, coding, working, browsing and creating documents."
    },

    "keyboard": {
        category: "Electronics",
        description: "An input device containing keys used to enter text and commands into a computer.",
        advantages: "Makes text entry fast, convenient and precise.",
        disadvantages: "Repeated typing may cause discomfort and dust can accumulate between keys.",
        uses: "Typing, entering data and controlling computer functions."
    },

    "mouse": {
        category: "Electronics",
        description: "A computer pointing device used to move a cursor and interact with items on a screen.",
        advantages: "Provides easy navigation, precise selection and convenient computer control.",
        disadvantages: "Requires a surface or connection and prolonged use may cause hand discomfort.",
        uses: "Selecting, clicking, dragging and navigating."
    },

    "headphones": {
        category: "Electronics",
        description: "An audio device worn over or around the ears to listen to sound.",
        advantages: "Provides convenient listening and helps focus on audio.",
        disadvantages: "Excessive volume may affect hearing and prolonged use may cause discomfort.",
        uses: "Listening to music, audio, videos and online classes."
    },

    "television": {
        category: "Electronics",
        description: "An electronic display device that receives and presents video and audio content.",
        advantages: "Provides entertainment, news, educational content and shared viewing.",
        disadvantages: "Excessive screen time can reduce physical activity and disturb routines.",
        uses: "Watching movies, news, shows, sports and educational programs."
    },

    "remote control": {
        category: "Electronics",
        description: "A wireless handheld device used to control electronic equipment from a distance.",
        advantages: "Allows convenient control without directly touching the device.",
        disadvantages: "Can be misplaced and usually requires batteries.",
        uses: "Changing channels, adjusting volume, powering devices and navigating menus."
    },

    "camera": {
        category: "Electronics",
        description: "A device that captures photographs and videos.",
        advantages: "Records memories, documents events and supports visual communication.",
        disadvantages: "Requires storage, power and proper handling.",
        uses: "Taking pictures, recording videos and documenting events."
    },

    "charger": {
        category: "Electronics",
        description: "An electrical device that supplies power to recharge a battery.",
        advantages: "Allows rechargeable devices to be reused conveniently.",
        disadvantages: "Requires a compatible power source and may wear out over time.",
        uses: "Charging phones, tablets, laptops and other compatible devices."
    },

    // =========================
    // STATIONERY & STUDY ITEMS
    // =========================

    "book": {
        category: "Education",
        description: "A collection of written or printed pages containing information, stories or knowledge.",
        advantages: "Supports learning, improves knowledge and encourages imagination.",
        disadvantages: "Physical books may take up space and can be damaged.",
        uses: "Reading, studying, learning and entertainment."
    },

    "notebook": {
        category: "Stationery",
        description: "A book of blank or ruled pages used for writing and recording information.",
        advantages: "Helps organize information, record ideas and revise lessons.",
        disadvantages: "Pages can be damaged or lost and writing requires manual organization.",
        uses: "Taking notes, practicing, journaling and organizing ideas."
    },

    "pen": {
        category: "Stationery",
        description: "A writing instrument that uses ink to create marks on paper or other surfaces.",
        advantages: "Provides convenient, clear and long-lasting writing.",
        disadvantages: "Ink can run out, leak or be difficult to remove.",
        uses: "Writing, signing documents, drawing and taking notes."
    },

    "pencil": {
        category: "Stationery",
        description: "A writing instrument containing graphite that produces marks which can usually be erased.",
        advantages: "Allows easy correction and is useful for sketching and practice.",
        disadvantages: "Needs sharpening and marks may smudge or fade.",
        uses: "Writing, sketching, drawing and solving exercises."
    },

    "paper": {
        category: "Stationery",
        description: "A thin material made mainly from processed plant fibers and used for writing or printing.",
        advantages: "Lightweight, versatile and easy to write or print on.",
        disadvantages: "Can tear easily and excessive use contributes to waste.",
        uses: "Writing, printing, drawing, packaging and crafts."
    },

    // =========================
    // EVERYDAY OBJECTS
    // =========================

    "bottle": {
        category: "Everyday Objects",
        description: "A container with a narrow opening used to hold liquids.",
        advantages: "Convenient for storing and transporting liquids.",
        disadvantages: "Can leak, break or require cleaning.",
        uses: "Storing and carrying water, beverages and other liquids."
    },

    "cup": {
        category: "Kitchenware",
        description: "A small container designed for drinking liquids.",
        advantages: "Convenient for serving and drinking beverages.",
        disadvantages: "May break and usually holds a limited quantity.",
        uses: "Drinking tea, coffee, water and other beverages."
    },

    "water glass": {
        category: "Kitchenware",
        description: "A drinking vessel commonly used to serve water and other beverages.",
        advantages: "Easy to use and convenient for serving drinks.",
        disadvantages: "Glass versions may break if dropped.",
        uses: "Serving and drinking water or other drinks."
    },

    "plate": {
        category: "Kitchenware",
        description: "A flat or slightly curved dish used for serving and eating food.",
        advantages: "Makes food serving and portion arrangement convenient.",
        disadvantages: "Can break, chip or require washing after use.",
        uses: "Holding meals, snacks and food portions."
    },

    "spoon": {
        category: "Kitchenware",
        description: "A utensil with a rounded bowl and handle used for eating or serving.",
        advantages: "Convenient for eating liquids, soft foods and serving dishes.",
        disadvantages: "Can require cleaning and may be unsuitable for certain solid foods.",
        uses: "Eating, stirring, measuring and serving food."
    },

    "fork": {
        category: "Kitchenware",
        description: "An eating utensil with prongs used to pick up food.",
        advantages: "Helps pick up and hold food while eating.",
        disadvantages: "Requires cleaning and is less suitable for some liquid foods.",
        uses: "Eating, holding and serving food."
    },

    "scissors": {
        category: "Stationery & Tools",
        description: "A cutting tool consisting of two blades joined at a pivot.",
        advantages: "Allows convenient and controlled cutting of suitable materials.",
        disadvantages: "Requires careful handling and maintenance.",
        uses: "Cutting paper, fabric and other suitable materials."
    },

    "key": {
        category: "Everyday Objects",
        description: "A shaped metal object designed to operate a compatible lock.",
        advantages: "Provides simple access control without electronic power.",
        disadvantages: "Can be lost, duplicated or damaged.",
        uses: "Locking and unlocking doors, cabinets and other secured items."
    },

    "wallet": {
        category: "Everyday Objects",
        description: "A small personal holder designed to store cards, money and identification.",
        advantages: "Keeps important personal items organized and easy to carry.",
        disadvantages: "Can be misplaced and may become bulky.",
        uses: "Organizing and carrying payment cards and personal items."
    },

    "umbrella": {
        category: "Everyday Objects",
        description: "A foldable or handheld canopy designed to protect a person from rain or sunlight.",
        advantages: "Portable and provides shelter from rain or direct sunlight.",
        disadvantages: "Can be damaged by strong winds and needs drying after use.",
        uses: "Providing protection from rain and sun."
    },

    "watch": {
        category: "Accessories",
        description: "A wearable timekeeping device that displays the time.",
        advantages: "Allows quick time checking and convenient time management.",
        disadvantages: "Some models require charging or battery replacement.",
        uses: "Checking the time and, on some models, tracking activity or notifications."
    },

    "sunglasses": {
        category: "Accessories",
        description: "Eyewear with tinted or protective lenses designed to reduce bright light.",
        advantages: "Reduces glare and can provide UV protection when equipped with UV-blocking lenses.",
        disadvantages: "Poor-quality lenses may not provide adequate UV protection.",
        uses: "Reducing glare and helping protect eyes from sunlight."
    },

    "soap": {
        category: "Personal Care",
        description: "A cleansing product that helps remove dirt, oil and impurities from skin.",
        advantages: "Supports cleanliness and helps remove dirt and oils.",
        disadvantages: "Some formulations may cause dryness or irritation in sensitive skin.",
        uses: "Handwashing and personal hygiene."
    },

    "bag": {
        category: "Everyday Objects",
        description: "A container made of flexible or rigid material used to carry belongings.",
        advantages: "Makes carrying and organizing belongings easier.",
        disadvantages: "May become heavy and can wear out over time.",
        uses: "Carrying groceries, personal items and daily essentials."
    },

    "backpack": {
        category: "Accessories",
        description: "A bag carried on the back using two shoulder straps.",
        advantages: "Allows hands-free carrying and distributes weight across the shoulders.",
        disadvantages: "Excessive weight or poor adjustment may cause discomfort.",
        uses: "Carrying books, stationery, clothing and other belongings."
    },

    "toy": {
        category: "Entertainment",
        description: "An object designed primarily for play, recreation or entertainment.",
        advantages: "Encourages creativity, learning and recreational activities.",
        disadvantages: "Some toys may break or may not be suitable for every age.",
        uses: "Playing, creativity, learning and recreational activities."
    },

    "helmet": {
        category: "Safety Equipment",
        description: "Protective headgear designed to reduce the risk of head injury during certain activities.",
        advantages: "Helps reduce the risk of head injuries when properly fitted and used.",
        disadvantages: "Can become uncomfortable if poorly fitted and must be replaced when damaged.",
        uses: "Protecting the head during cycling, riding and other appropriate activities."
    },

    // =========================
    // FURNITURE
    // =========================

    "bed": {
        category: "Furniture",
        description: "A piece of furniture designed to support a person while sleeping or resting.",
        advantages: "Provides a comfortable place for rest and sleep.",
        disadvantages: "Occupies space and requires regular cleaning.",
        uses: "Sleeping, resting and relaxation."
    },

    "chair": {
        category: "Furniture",
        description: "A seat designed for one person, usually with a backrest.",
        advantages: "Provides support and makes sitting and working convenient.",
        disadvantages: "Poor design or prolonged sitting may cause discomfort.",
        uses: "Sitting, studying, working and relaxing."
    },

    "table": {
        category: "Furniture",
        description: "A flat-topped piece of furniture supported by legs or a base.",
        advantages: "Provides a stable surface for activities and organizing objects.",
        disadvantages: "Occupies space and may be difficult to move.",
        uses: "Eating, studying, working and placing objects."
    },

    "vase": {
        category: "Home Decor",
        description: "A decorative container commonly used to hold flowers or plant arrangements.",
        advantages: "Enhances decoration and helps display flowers.",
        disadvantages: "Can break easily and may need frequent cleaning.",
        uses: "Displaying flowers and decorating rooms."
    },

    // =========================
    // CLOTHING & FOOTWEAR
    // =========================

    "shoe": {
        category: "Footwear",
        description: "Footwear designed to protect and cover the foot.",
        advantages: "Protects feet and provides support during everyday activities.",
        disadvantages: "Poorly fitted footwear may cause discomfort.",
        uses: "Walking, running, daily activities and protecting feet."
    },

    // =========================
    // FRUITS
    // =========================

    "apple": {
        category: "Fruit",
        description: "A round edible fruit that grows on apple trees and has a crisp texture.",
        advantages: "Provides fiber and a variety of nutrients as part of a balanced diet.",
        disadvantages: "May not be suitable for people with certain allergies or intolerances.",
        uses: "Eating fresh, preparing salads, juices and desserts."
    },

    "banana": {
        category: "Fruit",
        description: "An elongated fruit with a soft edible interior and yellow peel when ripe.",
        advantages: "Provides carbohydrates, fiber and potassium.",
        disadvantages: "Ripens quickly and may not suit people with certain dietary restrictions.",
        uses: "Eating fresh, making smoothies and preparing desserts."
    },

    "mango": {
        category: "Fruit",
        description: "A tropical fruit with sweet flesh and a large central seed.",
        advantages: "Provides vitamin C and other nutrients as part of a balanced diet.",
        disadvantages: "Ripe fruit spoils relatively quickly and may cause allergies in some people.",
        uses: "Eating fresh, making juice, smoothies and desserts."
    },

    "orange": {
        category: "Fruit",
        description: "A citrus fruit with a juicy interior divided into segments.",
        advantages: "Provides vitamin C and water.",
        disadvantages: "Its acidity may irritate some people with sensitive stomachs.",
        uses: "Eating fresh, making juice and adding flavor to food."
    },

    "dragon fruit": {
        category: "Fruit",
        description: "A tropical fruit with colorful skin and a soft flesh containing small edible seeds.",
        advantages: "Provides fiber, water and several nutrients.",
        disadvantages: "Availability may be seasonal and some varieties have limited shelf life.",
        uses: "Eating fresh, preparing fruit bowls and smoothies."
    },

    "star fruit": {
        category: "Fruit",
        description: "A tropical fruit that forms a star-shaped cross-section when sliced.",
        advantages: "Provides water, fiber and vitamin C.",
        disadvantages: "Not suitable for people with kidney disease because it contains substances that can be harmful to them.",
        uses: "Eating fresh, garnishing dishes and preparing fruit salads."
    },

    "strawberry": {
        category: "Fruit",
        description: "A red fruit with a juicy texture and small seeds on its outer surface.",
        advantages: "Provides vitamin C, fiber and antioxidants.",
        disadvantages: "Spoils quickly and may cause allergic reactions in some people.",
        uses: "Eating fresh, making desserts, jams and smoothies."
    },

    "blueberry": {
        category: "Fruit",
        description: "A small round blue-purple berry with a juicy interior.",
        advantages: "Contains fiber, vitamins and naturally occurring antioxidants.",
        disadvantages: "Can spoil quickly and may be expensive or seasonal in some places.",
        uses: "Eating fresh, baking and adding to cereals or smoothies."
    },

    // =========================
    // VEGETABLES
    // =========================

    "carrot": {
        category: "Vegetable",
        description: "An edible root vegetable commonly orange in color.",
        advantages: "Provides beta-carotene, fiber and several nutrients.",
        disadvantages: "Excessive intake is unnecessary and should not replace a varied diet.",
        uses: "Preparing salads, soups, cooked meals and snacks."
    },

    "tomato": {
        category: "Vegetable",
        description: "A soft edible fruit commonly used as a vegetable in cooking.",
        advantages: "Provides vitamin C and lycopene.",
        disadvantages: "Its acidity may cause discomfort for some people.",
        uses: "Preparing sauces, salads, soups and curries."
    },

    "potato": {
        category: "Vegetable",
        description: "A starchy tuber that grows underground.",
        advantages: "Provides carbohydrates, potassium and energy.",
        disadvantages: "Some cooking methods add large amounts of oil or salt.",
        uses: "Preparing curries, fries, mashed dishes and snacks."
    },

    "eggplant": {
        category: "Vegetable",
        description: "A vegetable with smooth purple skin and soft flesh.",
        advantages: "Provides fiber and is versatile in cooking.",
        disadvantages: "May absorb substantial oil during frying.",
        uses: "Preparing curries, roasted dishes and vegetable recipes."
    },

    "beetroot": {
        category: "Vegetable",
        description: "A root vegetable known for its deep reddish-purple color.",
        advantages: "Provides fiber, folate and naturally occurring plant compounds.",
        disadvantages: "May temporarily change urine or stool color in some people.",
        uses: "Preparing salads, juices, soups and cooked dishes."
    },

    "onion": {
        category: "Vegetable",
        description: "A bulb vegetable with layered flesh and a strong aroma.",
        advantages: "Adds flavor to dishes and contains beneficial plant compounds.",
        disadvantages: "Can cause eye irritation while cutting and may cause digestive discomfort in some people.",
        uses: "Adding flavor to curries, soups, salads and other dishes."
    },

    // =========================
    // FOOD
    // =========================

    "chocolate": {
        category: "Food",
        description: "A food product made primarily from cocoa ingredients, often combined with sugar and milk.",
        advantages: "Provides energy and cocoa-derived compounds, depending on the variety.",
        disadvantages: "Some varieties contain considerable sugar and fat.",
        uses: "Eating as a snack and preparing desserts, cakes and sweets."
    },

    "fruit": {
        category: "Food",
        description: "A broad group of edible plant products that are often sweet, juicy or refreshing.",
        advantages: "Many fruits provide vitamins, fiber, water and beneficial plant compounds.",
        disadvantages: "Some fruits spoil quickly and certain individuals may have allergies.",
        uses: "Eating fresh, preparing salads, juices and desserts."
    },

    "vegetable": {
        category: "Food",
        description: "An edible plant or plant part commonly used in savory meals.",
        advantages: "Many vegetables provide fiber, vitamins and minerals.",
        disadvantages: "Some require preparation, washing or cooking before consumption.",
        uses: "Preparing salads, curries, soups and nutritious meals."
    },

    // =========================
    // PLANTS & NATURE
    // =========================

    "flower": {
        category: "Nature",
        description: "The reproductive structure of many plants, often featuring colorful petals.",
        advantages: "Supports plant reproduction and provides resources for pollinators.",
        disadvantages: "Some flowers are short-lived and certain species may be toxic.",
        uses: "Plant reproduction, decoration, gardening and pollinator support."
    },

    "plant": {
        category: "Nature",
        description: "A living organism that typically grows using sunlight, water and nutrients.",
        advantages: "Supports ecosystems, provides oxygen and can supply food and shade.",
        disadvantages: "Requires appropriate water, sunlight, nutrients and maintenance.",
        uses: "Producing oxygen, supporting ecosystems, providing food and decorating spaces."
    },

    // =========================
    // SOIL TYPES
    // =========================

    "sandy soil": {
        category: "Soil",
        description: "Soil containing a high proportion of large sand particles that drains water quickly.",
        advantages: "Easy to work with and warms up relatively quickly.",
        disadvantages: "Drains rapidly and usually holds less water and nutrients.",
        uses: "Growing crops that tolerate well-drained soil when organic matter and nutrients are managed.",
        suitableCrops: "Groundnut, watermelon, millets, cassava and sweet potato, depending on climate and soil management.",
        suitableFruitsVegetables: "Watermelon, muskmelon, carrot and radish with adequate irrigation and soil enrichment."
    },

    "clay soil": {
        category: "Soil",
        description: "Fine-textured soil with tiny particles that hold water and nutrients.",
        advantages: "Can retain moisture and nutrients for plants.",
        disadvantages: "May drain slowly, become compacted and be difficult to work when wet.",
        uses: "Growing selected crops when drainage and soil structure are managed.",
        suitableCrops: "Rice, certain pulses and selected crops that tolerate moisture-retentive soil, depending on drainage.",
        suitableFruitsVegetables: "Cabbage, broccoli and certain leafy vegetables in well-managed soil; suitability depends on drainage and crop variety."
    },

    "silt soil": {
        category: "Soil",
        description: "Soil made largely of medium-sized particles that feel smooth and retain moisture.",
        advantages: "Generally fertile and capable of holding useful moisture.",
        disadvantages: "Can compact easily and may erode when exposed to water.",
        uses: "Supporting plant growth and agriculture when properly managed.",
        suitableCrops: "Wheat, rice, maize, pulses and other crops suited to local moisture conditions.",
        suitableFruitsVegetables: "Tomato, cucumber, pumpkin, leafy vegetables and some fruit crops when drainage is adequate."
    },

    "loamy soil": {
        category: "Soil",
        description: "A balanced mixture of sand, silt, clay and organic matter.",
        advantages: "Usually offers a good balance of drainage, aeration and moisture retention.",
        disadvantages: "May lose fertility without proper management and can still become compacted.",
        uses: "Growing a wide range of garden plants and crops.",
        suitableCrops: "Paddy, maize, wheat, pulses, groundnut and many other crops depending on climate and irrigation.",
        suitableFruitsVegetables: "Tomato, brinjal, chilli, okra, banana, mango, papaya and many other crops with suitable local conditions."
    },

    "peaty soil": {
        category: "Soil",
        description: "Soil containing a high amount of organic material and often holding substantial moisture.",
        advantages: "Contains substantial organic matter and can retain moisture.",
        disadvantages: "May be acidic, waterlogged or low in certain mineral nutrients.",
        uses: "Supporting certain moisture-loving plants when suitable conditions are maintained.",
        suitableCrops: "Selected crops adapted to acidic and moisture-rich conditions, only where drainage and nutrient levels are suitable.",
        suitableFruitsVegetables: "Certain berries and selected leafy vegetables when acidity, drainage and nutrients are appropriately managed."
    },

    "chalky soil": {
        category: "Soil",
        description: "Alkaline soil containing calcium carbonate and often pale-colored stones or particles.",
        advantages: "Often drains freely and contains calcium-rich materials.",
        disadvantages: "High alkalinity can reduce availability of iron and other nutrients to plants.",
        uses: "Growing plants adapted to alkaline soil conditions.",
        suitableCrops: "Barley, cabbage-family crops and selected plants tolerant of alkaline soil, depending on local conditions.",
        suitableFruitsVegetables: "Cabbage, beetroot and selected leafy vegetables; some fruit varieties may grow if nutrient deficiencies are managed."
    },

    // =========================
    // OTHER OBJECTS
    // =========================

    "car": {
        category: "Transportation",
        description: "A motor vehicle designed mainly to transport people on roads.",
        advantages: "Provides convenient travel, comfort and flexible transportation.",
        disadvantages: "Consumes energy, contributes to pollution and requires maintenance.",
        uses: "Traveling, commuting and transporting passengers."
    },

    "person": {
        category: "Human",
        description: "A human being detected within an image.",
        advantages: "Not applicable to people. SmartScan-AI identifies the presence of a person without judging them.",
        disadvantages: "Not applicable to people. The scanner does not evaluate personal characteristics.",
        uses: "Identifying the presence of a person in the camera view."
    },

    "toothbrush": {
        category: "Personal Care",
        description: "A small brush designed to clean teeth and maintain oral hygiene.",
        advantages: "Supports oral hygiene by helping remove plaque and food debris.",
        disadvantages: "Requires regular replacement and cleaning; improper brushing may irritate gums.",
        uses: "Brushing teeth and removing food debris and plaque."
    },

    "baseball bat": {
        category: "Sports Equipment",
        description: "A sporting implement used in baseball to hit the ball.",
        advantages: "Supports baseball practice and sport skill development.",
        disadvantages: "Requires proper supervision and safe sporting conditions.",
        uses: "Playing baseball and practicing batting skills."
    }

};
// =====================================
// 1. OPEN CAMERA
// =====================================

async function startCamera() {

    try {

        stopCamera();

        statusText.textContent = "Opening camera...";

        stream = await navigator.mediaDevices.getUserMedia({

            video: {
                facingMode: "environment"
            },

            audio: false

        });

        camera.srcObject = stream;

        await camera.play();

        camera.style.display = "block";

        capturedImage.style.display = "none";

        placeholder.style.display = "none";

        captureButton.disabled = false;

        scanButton.disabled = true;

        imageData = null;

        objectName.textContent = "No object identified yet.";

        statusText.textContent = "Camera activated successfully.";

    }

    catch (error) {

        statusText.textContent =
            "Camera unavailable. Please allow camera permission.";

        console.error("Camera error:", error);

    }

}
// =====================================
// 2. CAPTURE OBJECT
// =====================================

function captureObject() {

    if (!stream || !camera.videoWidth) {

        statusText.textContent =
            "Please open the camera first.";

        return;

    }


    // Set canvas dimensions

    canvas.width = camera.videoWidth;

    canvas.height = camera.videoHeight;


    // Draw camera image on canvas

    const context = canvas.getContext("2d");

    context.drawImage(
        camera,
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Convert captured image into JPEG

    imageData = canvas.toDataURL("image/jpeg", 0.9);


    // Display captured image

    capturedImage.src = imageData;

    capturedImage.style.display = "block";

    camera.style.display = "none";

    placeholder.style.display = "none";


    // Stop camera after capture

    stopCamera();


    // Enable identify button

    captureButton.disabled = true;

    scanButton.disabled = false;


    objectName.textContent =
        "Image captured. Ready for AI recognition.";

    statusText.textContent =
        "Object captured successfully.";

}
// =====================================
// 3. UPLOAD IMAGE
// =====================================

fileInput.addEventListener("change", function(event) {

    const file = event.target.files[0];

    if (!file) return;


    // Check image format

    if (!file.type.startsWith("image/")) {

        statusText.textContent =
            "Please select a valid image.";

        fileInput.value = "";

        return;

    }


    // Stop camera if running

    stopCamera();


    const reader = new FileReader();


    reader.onload = function(e) {

        imageData = e.target.result;

        capturedImage.src = imageData;

        capturedImage.style.display = "block";

        camera.style.display = "none";

        placeholder.style.display = "none";


        captureButton.disabled = true;

        scanButton.disabled = false;


        objectName.textContent =
            "Image uploaded. Ready for AI recognition.";

        statusText.textContent =
            "Image uploaded successfully.";

    };


    reader.onerror = function() {

        statusText.textContent =
            "Unable to read the selected image.";

    };


    reader.readAsDataURL(file);

});

// =====================================
// SMARTSCAN-AI - OBJECT SCANNING
// =====================================


async function scanObject() {

    if (!imageData) {
        statusText.textContent =
            "Please capture or upload an image first.";
        return;
    }

    try {

        statusText.textContent =
            "AI is analysing your image...";

        objectName.textContent =
            "Please wait while SmartScan-AI identifies the object.";

        scanButton.disabled = true;

        // Convert captured image into a file
        const imageBlob = await fetch(imageData)
            .then(response => response.blob());

        const formData = new FormData();

        formData.append(
            "image",
            imageBlob,
            "smartscan-image.jpg"
        );

        // Send image to Flask AI backend
        const response = await fetch(
            "http://127.0.0.1:5000/predict",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Image processing failed."
            );
        }

        // Check AI detection
        if (data.detections && data.detections.length > 0) {

            const item = data.detections[0];

            const name = item.name.toLowerCase().trim();

            const information = objectInformation[name];

            const confidence = Number(item.confidence);

            const isSoil =
                information &&
                information.category === "Soil";

            let result = "";

            // Object name
            result += `Detected Object: ${item.name}\n`;

            // Confidence
            result += `Confidence: ${item.confidence}%\n\n`;

            // =====================================
            // SOIL-SPECIFIC CONFIDENCE HANDLING
            // =====================================

            if (isSoil) {

                result +=
                    "🌱 SOIL IDENTIFICATION NOTICE\n\n";

                result +=
                    "Soil identification is based on visual appearance and may not be accurate. Different soil types can look similar.\n\n";

                // Soil confidence levels
                if (confidence < 50) {

                    result +=
                        "⚠️ Low confidence: The soil prediction is uncertain. Please verify the soil type before using the recommendations.\n\n";

                } else if (confidence < 80) {

                    result +=
                        "⚠️ Moderate confidence: This is a visual match, not a confirmed soil identification. Please verify the result.\n\n";

                } else {

                    result +=
                        "ℹ️ Strong visual match: The model matched this image with a soil category, but this does not confirm the actual soil type. Please verify before relying on the recommendations.\n\n";

                }

            } else {

                // Existing confidence warning for other objects
                if (confidence < 70) {

                    result +=
                        "⚠️ Warning: Identification may be incorrect.\n\n";

                }

            }

            // =====================================
            // DISPLAY OBJECT INFORMATION
            // =====================================

            if (information) {

                // Category
                result +=
                    `Category: ${information.category || "General"}\n\n`;

                // Description
                result +=
                    `Description: ${information.description || "Information unavailable."}\n\n`;

                // Advantages
                result +=
                    `Advantages: ${information.advantages || "Information unavailable."}\n\n`;

                // Disadvantages
                result +=
                    `Disadvantages: ${information.disadvantages || "Information unavailable."}\n\n`;

                // Uses
                result += "Uses:\n";

                if (information.uses) {

                    if (Array.isArray(information.uses)) {

                        information.uses.forEach((use, index) => {

                            result += `${index + 1}. ${use}\n`;

                        });

                    } else {

                        result += `${information.uses}\n`;

                    }

                } else {

                    result += "Information unavailable.\n";

                }

                // =====================================
                // SOIL RECOMMENDATIONS
                // =====================================

                if (isSoil) {

                    result += "\n🌱 SOIL RECOMMENDATIONS\n\n";

                    result +=
                        `Suitable Crops: ${information.suitableCrops || "Information unavailable."}\n\n`;

                    result +=
                        `Suitable Fruits & Vegetables: ${information.suitableFruitsVegetables || "Information unavailable."}\n\n`;

                    result +=
                        "Note: These are general suggestions. Actual crop suitability depends on soil testing, climate, irrigation, nutrients and local conditions.";

                }

            } else {

                result +=
                    "Additional information is not available for this object yet.";

            }

            // Show final result
            objectName.textContent = result;

            statusText.textContent =
                "Object scanning completed.";

        } else {

            objectName.textContent =
                "No supported objects detected. Try another image.";

            statusText.textContent =
                "Scanning completed.";

        }

    } catch (error) {

        console.error("Scanning error:", error);

        statusText.textContent =
            "Unable to connect to the AI backend.";

        objectName.textContent =
            error.message;

    } finally {

        scanButton.disabled = false;

    }

}

// =====================================
// 5. STOP CAMERA
// =====================================

function stopCamera() {

    if (stream) {

        stream.getTracks().forEach(track => {

            track.stop();

        });

        stream = null;

    }

    camera.srcObject = null;

}


// =====================================
// 6. RESET SCANNER
// =====================================

function resetScanner() {

    stopCamera();


    // Hide camera and captured image

    camera.style.display = "none";

    capturedImage.style.display = "none";

    capturedImage.src = "";


    // Show placeholder

    placeholder.style.display = "block";


    // Clear image data

    imageData = null;


    // Reset buttons

    captureButton.disabled = true;

    scanButton.disabled = true;


    // Clear uploaded file

    fileInput.value = "";


    // Reset result and status

    objectName.textContent =
        "Your identified object will appear here.";

    statusText.textContent =
        "Your scanner is ready.";

}
// =====================================
// 7. BUTTON EVENTS
// =====================================

startButton.addEventListener("click", startCamera);

captureButton.addEventListener("click", captureObject);

scanButton.addEventListener("click", scanObject);

resetButton.addEventListener("click", resetScanner);
// =====================================
// SMARTSCAN-AI PWA SERVICE WORKER
// =====================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("./service-worker.js")
            .then(() => {
                console.log("SmartScan-AI service worker registered successfully!");
            })
            .catch((error) => {
                console.error("Service worker registration failed:", error);
            });

    });

}