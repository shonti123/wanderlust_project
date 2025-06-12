// filepath: c:\Users\admin\Downloads\Airbnb-Build-master\new-project\Airbnb-Build\components\ExampleComponent.tsx
import imageSrc from "@/constants/imageSrc";

export default function ExampleComponent() {
  return (
    <div>
      <img src={imageSrc.hotel1} alt="Hotel 1" />
      <img src={imageSrc.default} alt="Default Image" />
    </div>
  );
}