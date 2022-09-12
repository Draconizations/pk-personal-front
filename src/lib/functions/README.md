# Custom string manipulation
When I first created this site, there was a lot of string and text manipulation hardcoded in that would only work for our system's name and description formats. 

I didn't want anyone deploying the site have to deal with fixing that themselves, so I made the string/text manipulation opt-in.

> **I do not recommend enabling this to beginners to javascript and/or programming as a whole.**
> 
> The default strings should work fine. It's already difficult enough for someone new to deploy the site without changing any of this. Save yourself a headache!

You can opt into this setting by setting the `VITE_CUSTOM_STRINGS` environment variable in your `.env` file. But hold onto your horses! We aren't done there!

## Editing custom strings
The default [customStrings.ts](./customStrings.ts) file *still* holds our own custom string functions. And while we tried to make these methods as failsafe as possible, I still do not advise you keep them that way. Especially not if you want your data displayed in unique ways.

The file is commented and it should be fairly straightforward to see what each function does. Some functions at the moment do the exact same things as the default functions, they're just here for easier editing.

If you need help getting the text to behave in a certain way, stackoverflow and the MDN documentation are your best friend. I won't be helping with custom strings on github.

In the end? Go wild, do some fancy things with your member names. Put a custom default description for when a description is empty. Turn every pronoun into "pro/noun" if you want to. The choice is yours.