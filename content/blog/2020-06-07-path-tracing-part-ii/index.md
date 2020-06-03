---
title: Realistic Path Tracing (part II)
date: "2020-05-27T02:41:41+0000"
description: Rendering glass and wrapping up my path tracer
---

For starters, please first read my previous post, [part 1](/blog/2020-05-26-path-tracing-part-i/), which
describes some of the context regarding the construction of
my path tracer. I left off last time with an incomplete 
glass renderer, so this is where the blog post picks up from.

#### Rendering Glass

I began by trying to implement a glass BTDF based off of
microfacet theory, as specified in my previous post. This led
to the failing render:

![Failing Glass](./render0.png)

After about a day and a half of tweaking variables to try to get it
to work, I figured I would have to take a different approach. 
From what I could tell, the formulas for the PDF and evaluation functions 
I was implementing seemed correct, and the refractive directions I was 
sampling appeared to behave correctly depending on the mediums they
were entering/exiting, so I wasn't sure exactly what was going on.
I decided to try a different approach.

Using Bram de Greve's [paper on refractive ray tracing](https://graphics.stanford.edu/courses/cs148-10-summer/docs/2006--degreve--reflection_refraction.pdf), 
I tried to use a simpler approach. My teaching assistant, Andrew Bauer, 
suggested that I assume that the surface was ideally dielectric and
work from there. This meant that I would:

* Assume that any refracted rays were ideally coming from a single,
perfectly refractive direction. Imperfect glass (e.g. glass with roughness) 
perturbs the refracted rays slightly, but that was not my focus.
* If a refracted ray originates from a single direction, then this would
imply that my sampling procedure returns that ray with probability 1 and
other rays with probability 0. I choose then to ignore my PDF by setting
it to 1 and then cancel out the BTDF cosine term using my evaluation function.

Despite this, I still needed to handle an important phenomenon when it
comes to rendering refractive materials: total internal reflection (TIR).
The basic idea behind total internal reflection is that if an incoming
ray hits a material at a sufficiently grazing angle, the resulting outgoing ray
will not actually be refractive, but rather, will be parallel to the surface
and thus reflective. The angle at which this phenomenon occurs is known
as **the critical angle** and is a property of the indices of refraction
for both the incoming and outgoing mediums. For more information, please
see the above paper or [the Wikipedia entry on TIR](https://en.wikipedia.org/wiki/Total_internal_reflection).

Fortunately, this phenomenon can be modeled fairly compactly in a path
tracer by making use the [Fresnel coefficient](https://en.wikipedia.org/wiki/Fresnel_equations#Complex_amplitude_reflection_and_transmission_coefficients), 
which in turn, can be generated using [Schlick's approximation](https://en.wikipedia.org/wiki/Schlick%27s_approximation).
The Fresnel coefficient essentially yields a number between 0 and 1
that lets us select between reflection and refraction. A high Fresnel
coefficient indicates a high amount of reflection; conversely, a low
Fresnel coefficient indices a high amount of refraction. A Fresnel
coefficient of 1 indicates total internal reflection (e.g. there is no
refraction, only reflection). In path tracing, we can importance sample 
the Fresnel coefficient to select between a refractive and reflective incident ray.
The algorithm works as follows:

1. Keep track of incoming and outgoing indices of refraction. We can do
this by keeping track of the mediums the rays are in.
2. Calculate the dot product of the surface normal and the outgoing ray.
3. Use the cosine value and the IORs to calculate the Fresnel coefficient.
4. Importance sample the Fresnel coefficient to select between reflection
and refraction.

In my case, I only had to keep track of two indices of refraction, the
first being that of glass and the second being that of air. I choose to
use 1.51 for Flint glass and 1.003 for air. In my previous attempts, I
extended my payload to keep track of the order in which these indices
appear, as it is important in determining the correct refractive ray.

I also swapped out my glass cup for a glass sphere, since it is
easier to render and debug. The inside of the sphere is not hollow,
but rather is assumed to be entirely filled with glass.

By rendering the intensity of the Fresnel coefficient as a shade
of red on top of the diffuse version of the sphere, I got the
following image. Note that I only accounted for Fresnel coefficients
for rays originating from the camera:

![Fresnel Coefficient](./render1.png)

As we can see, the Fresnel coefficient is extremely high around the
edges of the sphere but is very low near the center of the sphere,
where the rays hit perpindicular to the surface and are simply
refracted through.

The next step is to implement the generation of the refractive
ray. This can be done using the refraction formula listed in the
above paper. With a few tweaks, I ended up with the following image:

![Glass Sphere](./render2.png)

Looks pretty good! You can see how the sphere acts as a lens,
effectively inverting the rays passing through it. This is why
the image appears upside down; this actually models real-world
physical phenomena. See [this discussion](https://www.quora.com/Why-crystal-clear-glass-spheres-turnn-the-image-upside-down) for more details.

The final step is to bring back the more complex glass cup 
to replace the sphere.

![Glass Cup](./render3.png)

Ultimately, I was very satisfied with the glass rendering that I
produced. I decided to leave it as an ideal dielectric surface
and not tweak it any further using the GGX BTDF, since additional
attempts to incorporate the BTDF ended in failure. Unfortunately,
it took me around three days to finally get this to work, which
ate into the time I had allotted for rendering participating 
media using volumetric path tracing.

You'll also notice that the area covered by the glass seems 
shadowed, and that is in part because next event estimation does 
not work through glass (direct light through glass does not
account for refracted rays; it's treated as if it is a solid
object during the estimation).

#### Rendering Participating Media

TODO

#### Final Remarks

Given that the participating media render didn't look as
realistic as I would have liked it to look, I ultimately decided
to drop the fog/smoke effect from the final render. Here is the
final scene rendered, with depth-of-field brought back in and
using 1024 samples per pixel (instead of the usual 64):

![Final Render](./render5.png)

Ultimately, this was a very enjoyable project and, in my opinion,
was a successful end to a very enjoyable class. I hope to work
more with rendering in the future, perhaps continuing with
a real-time path tracer outside of the CSE 168 class.

Lastly, unrelated to path tracing and the aforementioned class, I 
realize that we are living through extraordinary times and that
I am writing this in the midst of ongoing social unrest throughout
the United States regarding police brutality. To anyone who is reading 
this blog, whether at the time this was published or in the distant future, I 
encourage you to stand in solidarity with the [Black Lives Matter](https://blacklivesmatters.carrd.co/)
movement. I have supported the following causes and urge you to do the same:

* Donate to a national or local bail fund to help peaceful protestors who
were wrongfully jailed. The Minnesota Freedom Fund or the National Bail
Fund Network are good choices.
* Donate to an organization whose mission is to advocate and fight for 
civil rights, new policing laws, and systemic change within the U.S. 
legal system to address the problems at hand.
* Donate to a family-owned business that has been affected by the rioting.
No one deserves to have their livelihood destroyed at random.
* Sign petitions regarding policy changes.
* Vote in whatever elections you can!

Thanks for reading this! :)
