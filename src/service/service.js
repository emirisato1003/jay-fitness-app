import { createServer, Model } from "miragejs";

createServer({
    models: {
        exercises: Model,
    },
    seeds(server) {
        server.create("exercise", {
            bodyPart: "waist",
            equipment: "body weight",
            gifUrl: "https://v2.exercisedb.io/image/jGfI9M6rdc5TfN",
            id: "0001",
            name: "3/4 sit-up",
            target: "abs",
            secondaryMuscles: { 0: "hip flexors", 1: "lower back" },
            instructions:
                { 0: "Lie flat on your back with your knees bent and feet flat on the ground.", 1: "Place your hands behind your head with your elbows pointing outwards.", 2: "Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle.", 3: "Pause for a moment at the top, then slowly lower your upper body back down to the starting position.", 4: "Repeat for the desired number of repetitions." },
            description: "The 3/4 sit-up is an abdominal exercise performed with body weight. It involves curling the torso up to a 45-degree angle, engaging the abs, hip flexors, and lower back. This movement is commonly used to build core strength and stability.",
            difficulty: "beginner",
            category: "strength",
        });
        server.create("exercise", {
            bodyPart: "waist",
            equipment: "body weight",
            gifUrl: "https://v2.exercisedb.io/image/EWfEJEJEX6rM99",
            id: "0002",
            name: "45° side bend",
            target: "abs",
            secondaryMuscles: { 0: "obliques" },
            instructions: {
                0: "Stand with your feet shoulder-width apart and your arms extended straight down by your sides.",
                1: "Keeping your back straight and your core engaged, slowly bend your torso to one side, lowering your hand towards your knee.",
                2: "Pause for a moment at the bottom, then slowly return to the starting position.",
                3: "Repeat on the other side.",
                4: "Continue alternating sides for the desired number of repetitions."
            },
            description: "The 45° side bend is a bodyweight exercise targeting the abdominal muscles, particularly the obliques. It involves bending the torso to the side while standing, engaging the core for stability and control.",
            difficulty: "beginner",
            category: "strength"
        }
        );
        server.create("exercise", {
            bodyPart: "waist",
            equipment: "body weight",
            gifUrl: "https://v2.exercisedb.io/image/l-mlPKzN9h3fXq",
            id: "0003",
            name: "air bike",
            target: "abs",
            secondaryMuscles: { 0: "hip flexors" },
            instructions: {
                0: "Lie flat on your back with your hands placed behind your head.",
                1: "Lift your legs off the ground and bend your knees at a 90-degree angle.",
                2: "Bring your right elbow towards your left knee while simultaneously straightening your right leg.",
                3: "Return to the starting position and repeat the movement on the opposite side, bringing your left elbow towards your right knee while straightening your left leg.",
                4: "Continue alternating sides in a pedaling motion for the desired number of repetitions."
            },
            description: "The air bike is a bodyweight exercise targeting the abdominal muscles and hip flexors. It involves a pedaling motion while lying on your back, alternating elbow-to-knee contact to engage the core.",
            difficulty: "beginner",
            category: "strength"
        });
        server.create('exercise', {
            bodyPart: "waist",
            equipment: "body weight",
            gifUrl: "https://v2.exercisedb.io/image/Af1EPGCMYf3lSl",
            id: "0006",
            name: "alternate heel touchers",
            target: "abs",
            secondaryMuscles: { 0: "obliques" },
            instructions: {
                0: "Lie flat on your back with your knees bent and feet flat on the ground.",
                1: "Extend your arms straight out to the sides, parallel to the ground.",
                2: "Engaging your abs, lift your shoulders off the ground and reach your right hand towards your right heel.",
                3: "Return to the starting position and repeat on the left side, reaching your left hand towards your left heel.",
                4: "Continue alternating sides for the desired number of repetitions."
            },
            description: "Alternate heel touchers is a bodyweight exercise targeting the abdominal muscles, particularly the obliques. It involves lying on your back, lifting your shoulders, and reaching side to side to touch your heels, engaging your core throughout.",
            difficulty: "beginner",
            category: "strength"
        });
        server.create('exercise', {
            bodyPart: "back",
            equipment: "cable",
            gifUrl: "https://v2.exercisedb.io/image/VFZqlsAb043t4c",
            id: "0007",
            name: "alternate lateral pulldown",
            target: "lats",
            secondaryMuscles: { 0: "biceps", 1: "rhomboids"},
            instructions: {
                0: "Sit on the cable machine with your back straight and feet flat on the ground.",
                1: "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
                2: "Lean back slightly and pull the handles towards your chest, squeezing your shoulder blades together.",
                3: "Pause for a moment at the peak of the movement, then slowly release the handles back to the starting position.",
                4: "Repeat for the desired number of repetitions."
            },
            description: "The alternate lateral pulldown is a cable machine exercise targeting the latissimus dorsi, with secondary emphasis on the biceps and rhomboids. It involves pulling handles towards the chest in an alternating fashion, focusing on back strength and muscle engagement.",
            difficulty: "beginner",
            category: "strength"
        });
        server.create('exercise', {
            bodyPart: "chest",
            equipment: "leverage machine",
            gifUrl: "https://v2.exercisedb.io/image/jwYYoMTKDOL4-Q",
            id: "0009",
            name: "assisted chest dip (kneeling)",
            target: "pectorals",
            secondaryMuscles: { 0: "triceps", 1: "shoulders"},
            instructions: {
                0: "Adjust the machine to your desired height and secure your knees on the pad.",
                1: "Grasp the handles with your palms facing down and your arms fully extended.",
                2: "Lower your body by bending your elbows until your upper arms are parallel to the floor.",
                3: "Pause for a moment, then push yourself back up to the starting position.",
                4: "Repeat for the desired number of repetitions."
            },
            description: "The assisted chest dip (kneeling) is a chest-focused exercise performed on a leverage machine, where the user kneels on a pad for support. This machine-assisted variation helps reduce the load, making it accessible for those building strength or learning proper dip technique.",
            difficulty: "beginner",
            category: "strength"
        });
    },

    routes() {
        this.namespace = "api";
        this.logging = false;

        this.get("/exercises", (schema, request) => {
            return schema.exercises.all();
        });
    }
});