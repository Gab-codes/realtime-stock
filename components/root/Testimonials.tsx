import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { testimonials } from "@/data/testimonials";

const Testimonials = () => (
  <div className="flex min-h-screen items-center justify-center px-6 py-12">
    <div>
      <h2 className="text-center font-semibold text-5xl tracking-[-0.03em]">
        Real Users. Real Simplicity.
      </h2>
      <p className="mt-3 text-center text-muted-foreground text-xl">
        From skepticism to daily use — see how people trade with AI
      </p>

      <div className="mx-auto mt-8 w-full max-w-(--breakpoint-xl) sm:mt-14">
        <div className="grid grid-cols-1 overflow-hidden border-background border-r md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col px-6 py-8 outline-1 outline-border outline-solid"
            >
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className="h-5 w-5 fill-yellow-500 stroke-yellow-500"
                  />
                ))}
              </div>

              <p className="my-6 max-w-md text-center text-[17px]">
                &quot;{testimonial.testimonial}&quot;
              </p>

              <div className="mt-auto flex items-center justify-center gap-3">
                <Avatar className="size-9">
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <AvatarFallback className="bg-primary font-medium text-primary-foreground">
                    {testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-semibold leading-tight">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonial.designation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Testimonials;
