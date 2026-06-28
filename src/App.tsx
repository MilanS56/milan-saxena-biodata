import { AboutSection } from "./sections/AboutSection";
import { ClosingSection } from "./sections/ClosingSection";
import { DetailsSection } from "./sections/DetailsSection";
import { FamilyLineageSection } from "./sections/FamilyLineageSection";
import { HeroSection } from "./sections/HeroSection";
import { HobbiesSection } from "./sections/HobbiesSection";
import { ValuesSection } from "./sections/ValuesSection";
import { profileContent } from "./data/profile";

function App() {
  return (
    <main id="profile-showcase" className="min-h-screen bg-ivory text-ink">
      <HeroSection profile={profileContent.person} />
      <AboutSection paragraphs={profileContent.about} />
      <DetailsSection details={profileContent.details} />
      <FamilyLineageSection family={profileContent.family} />
      <HobbiesSection hobbies={profileContent.hobbies} />
      <ValuesSection values={profileContent.values} />
      <ClosingSection contact={profileContent.contact} />
    </main>
  );
}

export default App;
