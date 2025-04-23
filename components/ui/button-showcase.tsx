import { Button } from "./button"
import { GradientButton } from "./gradient-button"
import { PulseButton } from "./pulse-button"

export function ButtonShowcase() {
  return (
    <div className="space-y-8 p-6 bg-card rounded-lg border">
      <div>
        <h3 className="text-lg font-semibold mb-4">Standard Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <span className="text-lg">+</span>
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Gradient Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <GradientButton variant="blue">Blue Gradient</GradientButton>
          <GradientButton variant="purple">Purple Gradient</GradientButton>
          <GradientButton variant="green">Green Gradient</GradientButton>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Pulse Buttons (Call to Action)</h3>
        <div className="flex flex-wrap gap-4">
          <PulseButton pulseColor="blue">Primary Action</PulseButton>
          <PulseButton pulseColor="purple" variant="secondary">
            Secondary Action
          </PulseButton>
          <PulseButton pulseColor="green" variant="outline">
            Outline Action
          </PulseButton>
        </div>
      </div>
    </div>
  )
}
