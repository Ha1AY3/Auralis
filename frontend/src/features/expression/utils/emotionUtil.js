
export const mapBlendshapesToEmotion = (categories) => {
    const getScore = (name) => {
        const found = categories.find(c => c.categoryName === name);
        return found ? found.score : 0;
    };

    const smileLeft = getScore("mouthSmileLeft");
    const smileRight = getScore("mouthSmileRight");
    const browDownLeft = getScore("browDownLeft");
    const browDownRight = getScore("browDownRight");
    const cheekSquintLeft = getScore("cheekSquintLeft");
    const cheekSquintRight = getScore("cheekSquintRight");
    const jawOpen = getScore("jawOpen");
    const browUp = (getScore("browOuterUpLeft") + getScore("browOuterUpRight")) / 2;

    const avgSmile = (smileLeft + smileRight) / 2;
    const avgBrowDown = (browDownLeft + browDownRight) / 2;
    const avgCheekSquint = (cheekSquintLeft + cheekSquintRight) / 2;
    const eyeSquint =
        (
            getScore("eyeSquintLeft") +
            getScore("eyeSquintRight")
        ) / 2;

    if (browUp > 0.6 && jawOpen > 0.5 && avgSmile < 0.3) {
        return "surprised";
    }

    if (avgSmile > 0.5 && avgCheekSquint > 0.3) {
        return "happy";
    }
    if (avgSmile > 0.6) {
        return "happy";
    }

    if (avgBrowDown > 0.2 &&
        eyeSquint > 0.15 &&
        avgSmile < 0.1) {
        return "angry";
    }

    if (avgBrowDown > 0.001 && avgSmile < 0.001) {
        return "sad";
    }

    return "neutral";
};