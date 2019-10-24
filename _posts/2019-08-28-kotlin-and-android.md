---
layout: post
title: "Kotlin and Android"
guest: Florina Muntenescu 
recorded: 2019-07-29
published: 2019-08-28
trackid: 672061601
length: "42:02"
length_rounded: "42 mins"
tags: [Android, Kotlin/Everywhere, Learning]
image: florina.png
description: "We sit down with Florina from Google to talk about everything Kotlin, from Android and what it means to be Kotlin First, to the series of Kotlin/Everywhere events that JetBrains and Google have collaborated on, and even touching on code reviews."
bio: "Florina is working as an Android Developer Advocate at Google, helping developers architect clean, testable apps using the Architecture Components libraries. She has been working with Android for 8 years, previous work covering news at upday, payment solutions at payleven and navigation services at Garmin."
                                                                                                                                                                                                                                                                                        
notes: 
    - text: Kotlin/Everywhere
      link: https://everywhere.kotlinlang.org

---

## Transcript

0:12	Hadi Hariri:	Welcome to Talking Kotlin. On this episode, I'm sitting down with Florina Muntenescu discussing everything about Kotlin and Android, the recent announcements, and Kotlin/Everywhere. Hi, Florina. How are you?

0:25	Florina M.:	Hi, thank you for having me. And congrats on the pronunciation. A really nice way of saying my name. I know it's complicated.

0:33	Hadi Hariri:	Oh, well, thank you. Considering that I messed up where you were born, at least I could get your name right. And by the way, how is your home country, Italy?

0:48	Florina M.:	(laughs) Yeah. I'm Romanian. Hadi thought I'm Italian at one point. But I get that, and I take it as a compliment.

0:54	Hadi Hariri:	Okay. But you have to admit that Florina does sound like an Italian name.

0:58	Florina M.:	Yeah, that's true.

1:01	Hadi Hariri:	There's a guy on my team called Florian. Guess where he's from?

1:05	Florina M.:	Romania?

1:06	Hadi Hariri:	Exactly. Right? I could have thought about like, Florian, Florina. Never mind. But I can pronounce like there's no tomorrow. So how are you doing? How is the post I/O, post-conferences, postdroid stress?

1:21	Florina M.:	It’s good. It seems like forever ago, given how many things we've been doing since, especially on Kotlin.

1:29	Hadi Hariri:	You said that Android is Kotlin First. What does that mean?

1:34	Florina M.:	Can I go a little bit back to 2017? That's when we announced that Kotlin is a first-class language for Android. And slowly since then, we've been doing quite a lot of things to support Kotlin: from a better interop with Android Studio, like the Kotlin plugin being part of Android Studio with all sorts of link checks and refactoring support. Then we also went towards making sure that the Android SDK is Kotlin friendly. Because we really want to make sure that for a developer working on Android in Kotlin the Android SDK also is as Kotlin friendly as possible. So we’ve added all of these nullability checks, for example, for a lot of the Android SDKs.
		Apart from this, we've also added a series of KTX libraries. These are extensions to either the Android framework or to different libraries that just help you make your app development in Kotlin sweeter. For example, the Core KTX provides all sorts of functionalities on top of the Android framework. To give you one example: if you want to add two colors, instead of using the color utils API, you can just do color one plus color two, so you have that operator overloading that Kotlin enables. All of that support for SDKs is one thing, but we also have a series of libraries in Android, specifically the architecture components ones, that ended up adding support for Kotlin as well.
		For example, Room, one of the database libraries and one of my favorite libraries in architecture components, also has support for suspend queries.

3:34	Hadi Hariri:	By the way, what does Room stand for?

3:37	Florina M.:	Oh, it doesn't stand for anything.

3:40	Hadi Hariri:	It's kinda like an ORM, it's a data access layer or something, right?

3:46	Florina M.:	Yeah, it could have come from that. I wasn't there when the name was set, but yes, it's a layer over SQLite, which is an ORM, but I'm not sure why they called it Room.

4:00	Hadi Hariri:	Okay, I just thought it was a play on ORMs or something like that. Okay, never mind.

4:11	Florina M.:	It's great for puns.

4:11	Hadi Hariri:	Yeah, I guess.

4:12	Florina M.:	For example, in Room we opened the door to coroutines as well.

4:16	Hadi Hariri:	Oh, oh god. Yes. Next!

4:21	Florina M.:	Okay, if you want to stop here, I’ll try... I'm sorry. So, if you're doing a query and want to run this inside a 
coroutine, now we just expose the queries as suspend functions. So it's all that easy interop that you would also expect from these kind of APIs. And it's not just that. Also for WorkManager, another library that allows you to do deferred background tasks, we have support for coroutines. And more. I don't want to list all the libraries.

4:56	Hadi Hariri:	Coming back to Room for a second. You said you have support for suspend functions. A lot of people when using coroutines kind of assume that it suddenly adds some magic, and then if I'm calling a blocking library, then because I have a coroutine, a suspend function, it solves all problems, right? And yet you really need to have a library that has support for non-blocking calls, whether it's in IO or whatever. So are you saying that Room has that support?

5:32	Florina M.:	In general, Room tries to ensure that you can do queries asynchronously and away from the main thread. For example, with suspend functions, there is some magic under the hood that also ensures that it switches context, and things are happening away from the main dispatcher.

5:54	Hadi Hariri:	Okay.

5:55	Florina M.:	Given that it's a suspend function, it means that you still need to, at one point somewhere higher in your app, do a coroutine dock, uh, sorry, a dock launch.

6:07	Hadi Hariri:	Okay. So essentially you're starting to add a whole bunch of stuff that is for Kotlin?

6:12	Florina M.:	Yes.

6:13	Hadi Hariri:	What does that mean for people that are not using Kotlin, but are using another language, such as Java, for 
instance?

6:22	Florina M.:	It doesn't necessarily mean anything for them. Because we are not stopping supporting any Java programming language 
features. In the case of Room, if you don't care about coroutines, then you just won't use a suspend query. You would just use any other kind of queries. So we just try to provide some extra functionality for developers.

6:54	Hadi Hariri:	And make it a little bit more friendly towards Kotlin? Not friendly, kind of more idiomatic Kotlin, taking advantage of much of the features of Kotlin to provide a better experience, right?

7:04	Florina M.:	Yes. That's in general what we wanted to do, but this year, getting back to your initial question 10 minutes ago, we thought we're going Kotlin First. This means that we want to go to the next level, not just provide Kotlin-friendly APIs, but maybe even more building libraries in Kotlin. I don't know if your listeners have played around or checked out the implementation of Room, but some of the compiler-related things were already written in Kotlin from the beginning. So we were already going towards that Kotlin First approach, but now we're doing this even more at the API surface level, and we'll try to build more libraries in Kotlin directly.
		But to get back to your question on Java, if your a Java programming language developer, because it's Kotlin and it compiles to the JVM, you will still be able to use the libraries, even if they're written in Kotlin.

8:09	Hadi Hariri:	One question that people also asked me as a consequence of this is, should I port my existing application over to Kotlin, or can I continue to develop in Java? I know what I answer them, but I'm wondering what would you say if someone came up to you and asked you that?

8:28	Florina M.:	I think that, as an app developer, what matters is what you're building. Especially if you are in a startup, then building those features is what matters. From a practical point of view, I don't think that developers need to right now completely convert their apps into Kotlin. They need to think about what's relevant to their business. But, saying this, if you're building new features, or as you're touching files, those are the times to go towards Kotlin and embrace Kotlin and all the benefits it brings.

9:07	Hadi Hariri:	Yeah, we're pretty much aligned here, because I say the same thing. If you don't see any specific value from a business perspective or even from a technical perspective to convert your stuff over to Kotlin, there's no need to do it right now. You can do it as and when you need it, right?

9:22	Florina M.:	Yes.

9:23	Hadi Hariri:	That brings me to another question, which is also something that a lot of people are asking. And sorry, I usually don't do Android shows. This is my first really specific Android show, which is crazy, right? But anyway. I am not an Android developer, which I've already said like a thousand times, but just in case someone randomly decides this episode to be the first they listen to. I don't know much about all of the different options that have been offered in Android to deal with non-blocking code. But again, there are folks that say, “Oh well, I'm doing async tasks.” Then you had the RX, then you’re recommending this other solution, then you're doing this, and now you're coming to me and saying coroutines. What am I meant to do? Should I jump onto coroutines, or can I continue to use what I was doing, or should I convert new projects that I work on, should I use coroutines? What is the general consensus there?

10:32	Florina M.:	I think now this is what we're recommending: coroutines to be the way to go. Of course, there are so many ways of doing background work in Android. I'm hoping people are not using async tasks anymore, but we also have the usual runnables, RxJava support. I like RxJava and I used it before in production. My fear there is that a lot of times people tend to abuse RxJava. RxJava is really an amazing API, and it's so powerful, but it tended to be used just to do something on a background thread, and not really use that at the full power. Whereas coroutines, if this is what you want, just to do something on a background thread, then that's easy to do.

11:23	Hadi Hariri:	Essentially, when we were talking about RX a lot of times outside of the Android world, it was always about infinite amount of data that you have to observe, that you have to act on, and that got ported over to mouse clicks, and movements, and fingers, and buttons that are also considered an infinite amount of data. So I could use that to work with async tasks, right?

11:54	Florina M.:	Yeah. Coroutines are the way to go for us, but that doesn't mean that we're completely forgetting about developers that are not using coroutines. Take Room, for example: we also have support for RxJava. For WorkManager, we have support for ListenableFutures which are part of Guava, so we do try to cater for developers that don't use the latest and the coolest APIs. But definitely a lot of the stuff in terms of how to do background work in Android is based on coroutines.

12:31	Hadi Hariri:	And as yourself that's experienced many of these technologies, where do you put coroutines? Do you think that it's as simple as the promise was?

12:47	Florina M.:	So you're saying how easy the coroutines promised to be?

12:50	Hadi Hariri:	I mean, when we initially came out with coroutines, there was this promise... No pun intended there. There was this promise that in the future... just a second pun there. Okay, I'm gonna stop. There was this idea that it's going to be a small surface API, it's going to be much simpler for you to think about how you do background tasks, how you do non-blocking operations, than some of the other solutions. We all know that the coroutines API have somewhat evolved, right? We've gone into the scope area and things. How do you feel about it overall?

13:30	Florina M.:	Yeah, that's exactly what I wanted to bring up, the coroutines scope. In Android, when you are architecting your app, you'd have your UI layer, the part where you're actually displaying things, and then you would need to have some data that you need to display, a place where you're computing that UI logic and then that UI logic is computed based on some business logic, and so on. That place where you're computing that business logic, that's something that you would do probably in a view model. The view model would directly talk to the UI, and we decided that's the place where you would actually launch your coroutines. So the view model now also supports this coroutines scope.
		How I'm trying to architect my APIs is like this: from the UI, I know that everything that's happening in the UI needs to be on the UI layer, but then the view model, because it also survives things like rotation or other configuration changes, this is the one that will hold the coroutine scope. So the view model is the one that launches the coroutine, and then from there on, I know that everything that's happening, no matter how extensive or how heavy it is, is going to happen away from the main thread. So if I'm talking about computing some heavy business logic or doing things with the database or with the networking layer, I know that those things are away from the main thread because the view model is the one that decided that, that launched the coroutine.
		So what I've done as a sort of a rule is that the view model is the place where we're launching the coroutine, and everything else is just suspension functions, and only in specific cases where we need maybe a smaller, a short coroutine to be created to do some other background task that's not related to the UI, that's when I would launch another coroutine in my app.

15:25	Hadi Hariri:	Okay. And this is all guidance that is available? Like with sample applications and tutorials that people can follow?

15:33	Florina M.:	We're talking about the view model coroutines scope, in our developer.android.com documentation, but pretty much all of our samples that cover coroutines or work with coroutines also have the view model coroutine scope. And we actually have a code lab on how to work with coroutines in Android that's following exactly this pattern.

16:00	Hadi Hariri:	And what about testability? How have you found that in comparison to some of the other solutions, because I know that Sean, who's also on the DevRel team, has been doing some stuff around that?

16:10	Florina M.:	For me, the part when I'm just exposing a suspend function, that's great because I can just unit test that. The more complicated part appears when you're starting to work with with dispatchers, but I do know that we have several ways of handling this with a test dispatcher and others.

16:28	Hadi Hariri:	And going back to my question then. Having experienced all three, where would you sit right now?

16:39	Florina M.:	All three you mean RxJava, async tasks, and coroutines?

16:44	Hadi Hariri:	Yeah.

16:47	Florina M.:	For me, coroutines win hands down just because of how easy it is to work with them, and because of all of this support that we have for them in all the libraries that we're building. It just makes development so much easier and so smooth.

17:04	Hadi Hariri:	Okay. I wanna go back a little bit to what we were talking about: Kotlin First and some of the libraries that you mentioned. And we don't want to get too deep into this because that's going to to take up an episode of itself. But one of the libraries that you mentioned at I/O was Compose, right? Jetpack Compose. Can you just give a brief overview of what that is, and what the state of it is?

17:32	Florina M.:	Sure. Compose is an unbundled UI library, and it's using a custom Kotlin compiler plugin. There was a talk at I/O that explains things much more in depth about how to build declarative UI patterns, and what's the mindset behind Jetpack Compose. This is all built in public on AOSP, and you'll see that it's built in Kotlin, so this is what I was talking about—building new things in Kotlin, going Kotlin First on Android.
	What's the status right now? It's not in alpha. Actually, right now you don't even have a way to get the artifacts, so if you want to play around with it, you would need to actually get the AOSP and get the Compose set of libraries and compile them yourself. We do provide the information on how to do this on our developer.android.com website. I would say, for now, it's work in progress. We are definitely working on it.	

18:45	Hadi Hariri:	And there's a Slack channel as well, on the Kotlin Slack, exchanging a lot of ideas and feedback. So if anyone's interested, you should join that too.

18:53	Florina M.:	Yes.

18:54	Hadi Hariri:	I've got you here asking you a million questions, and I'm trying to ask the questions that a lot of times people ask me. I'm sorry that I've put you on the complete and utter spot. But another thing that people often ask, and especially when we are outside of our bubble, wherever our bubble may be, “What is the uptake of Kotlin on Android? Are people using Kotlin on Android?” I'm like, two years ago Google said, “We're supporting Android.” This year they come out and say, “Yes, Kotlin First." But still, people oftentimes are reluctant to adopt Kotlin, so do you have any kind of numbers or anything that you could share around what the adoption is in terms of Android?

19:40	Florina M.:	I have some numbers for the top-1000 apps. Here we're looking at the apps with most number of installs from the Play Store, and we're going around 40+ percent of Kotlin adoption.

20:01	Hadi Hariri:	And it's growing year by year, right?

20:03	Florina M.:	Yes.

20:03	Hadi Hariri:	I know that that number was lower a few years ago, so it's good to see that it's growing. If it's declining that's a problem. It's not declining, it's growing. Everything's great. Awesome. And what about outside of Android?

20:16	Florina M.:	Outside of Android, I know a few folks that use it on back end, and I know it's possible to use it on cloud with Google Cloud, but I'm hoping you can help answer this question.

20:32	Hadi Hariri:	From our side, we're getting a massive increase of adoption outside of Android. Initially, as everyone knows, except for the person that is listening to this podcast for the first time, Kotlin was never meant to be an Android language. Someone complained, we fixed a bug, and look where we are now. So, we were seeing growth in other areas, namely server side, and then of course Android shot up in terms of adoption, and the server side continued to grow, but Android was growing much faster. But now we're starting to see a much higher increase in server side and outside of server and Android, even desktop or JavaScript side, etc. And I'm always looking at the numbers of KotlinConf attendees. I think the first KotlinConf was around 70% or so Android developers, and this isn't mutually exclusive because the way we ask the question is, what types of developments are you doing? And there are people that say Android and server side.
		But we're starting to see that it equalizes now. There's a ton of people that are doing server side, and we're seeing a whole bunch of companies, big and small, that are adopting Kotlin on the server side outside of Android. And that leads me to one other thing that you and I can speak about a lot, of course, which is Kotlin/Everywhere.

22:05	Florina M.:	I was hoping you would actually say multiplatform.

22:10	Hadi Hariri:	What is multiplatform, sorry? (laughs)

22:12	Florina M.:	Like Kotlin/Native and multiplatform in general.

22:14	Hadi Hariri:	Yes, absolutely. But multiplatform, iOS, Kotlin/Native, all of that has introduced a whole bunch of different types of development. In fact, there's a company that is developing and has shipped, not just one, there are multiple companies that have shipped Kotlin multiplatform applications entirely written in Kotlin on Android and then interop with iOS. I think it's called Careem, which is kind of like the Uber of Dubai or Saudi Arabia, I can't remember one of the two.

22:54	Florina M.:	I really like the promise that Kotlin/Native brings for multiplatform. Like, I've seen and I've been in companies where we had exactly the same logic implemented on Android, on iOS, and on front end, and it would have been so great to have just one library that all of these platforms could use and not reinvent the wheel every time.

23:19	Hadi Hariri:	People though, when you talk to them about the whole multiplatform projects and code sharing, sometimes are reluctant. They're kind of like, “No, you know, I need to do a lot of UI, and my business logic isn't that much.” But business logic doesn't necessarily mean like the actual business logic. It means everything else that you just mentioned, right? All of the libraries, all of the networking, all of these things that potentially are exactly the same on multiple platforms. And that's a hell of a lot of code in comparison to your view model and some interactions with platform specific components.

23:54	Florina M.:	Yeah. I think I've been talking a lot about modularizing your app, and some of the modules that developers can create while splitting their app are things that can be reused.

24:07:00	Hadi Hariri:	Yeah. After we discuss multiplatform projects, shame on you Hadi for not even bringing that up. Anyway. 
Kotlin/Everywhere. What was that all about?

24:22:00	Florina M.:	You said that developers are starting to use Kotlin, and you were wondering, okay, is everyone actually using Kotlin? And the answer is not yet, but we want to help people that indeed want to learn Kotlin. In order to do this, we created Kotlin/Everywhere, which is a series of community-led events. This means that we are supporting communities to create events where they can teach their communities or their developers Kotlin. We call it Kotlin/Everywhere because Kotlin can be used on so many different platforms and languages, and everywhere in the world, so “Everywhere” just felt very suited.

25:12:00	Hadi Hariri:	Yeah. Whatever platform, desktop, iOS, JavaScript, web, anything—anywhere you want to use Kotlin you can use it. And “Everywhere” was the whole play on the word of let's try and get everyone in the community, in any location put on an event. And this was a JetBrains and Google initiative that we put together, and it's amazing how the community has embraced it. Going to the website the other day, I think that there's like 200+, if not more, events going on.

25:50:00	Florina M.:	I actually have the numbers. I checked them before the meeting. We have 250+ events submitted.

25:56:00	Hadi Hariri:	Wow.

25:57:00	Florina M.:	Out of these, I think something like 70 already happened, but what we wanted with Kotlin/Everywhere is to have this series of events happening between Google I/O and KotlinConf. So we said something like 15th of May until 1st of December. Now we're just in August, there are still several months when developers can learn about Kotlin via Kotlin/Everywhere events.

26:26:00	Hadi Hariri:	And it's important to emphasize that these are community-led events, that anybody can put on a Kotlin/Everywhere event. The only requirement, so to speak, is that it does cover multiple platforms when we're talking about Kotlin, right?

26:44:00	Florina M.:	Yes, and general Kotlin. For example, I've been talking a lot about Kotlin features that can be applied on whatever platform you're working on. What we're also trying to do with these events is to provide developers with offline help, maybe not offline, but not necessarily in person, help them to learn Kotlin. For example, we have several code labs on different areas of Kotlin, for developers to do either at Kotlin/Everywhere events or just at home if they want. We even created several new ones specifically for Kotlin/Everywhere or, let's say, launched in the context of Kotlin/Everywhere.

27:28:00	Hadi Hariri:	That is very true. New code labs have been created and continue to be created, teaching people different things that you can do with Kotlin.

27:39:00	Florina M.:	It's also part of what we see as going Kotlin First on Android. We really want to support developers to learn Kotlin. Also, you'll see that in general the samples that we're building are and will be built in Kotlin first, and sometimes even Kotlin only.

27:57:00	Hadi Hariri:	So as a DevRel, as a Dev Advocate on the Android team, what are the main things that people ping you about in terms of wanting or needing?

28:12:00	Florina M.:	I think developers don't know how to get started sometimes. “How do I get started with Kotlin?” And the question that you asked, “Should I just refactor my entire app to use Kotlin?” So in terms of how to get started, tests would be one way, but I feel like with tests you don't really get the taste of the power of Kotlin or idiomatic Kotlin.
	Apart from playing around, doing different code labs, and going to Kotlin/Everywhere events, in production, I would say start small. Start with several files that you're touching when you're modifying something else. But what we also try to do in our sample apps is making sure that things are as atomic as possible. Because you are changing code, and chances are if you convert your code from the Java programming language to Kotlin, then you'll also have to do some idiomatic checks, so you are changing the code. We're trying to ensure that these Kotlin-specific changes are done in a different commit than the commit that fixes a bug. Just to make things easy to review afterwards.	

29:32:00	Hadi Hariri:	Yeah, that's a very good point. Because a lot of times, even in the context of converting, people were asking me, "I convert a file to Kotlin, and I eliminate three other files, and I lose track of what's happening in those other files.” It's kind of like, poof, vanishes from VCS. So keeping this separate is actually a very good point.

29:57:00	Florina M.:	Yeah, and easy to review in the end.

29:59:00	Hadi Hariri:	Yeah. Who reviews? (laughs)

30:00:00	Florina M.:	In your team. I hope you do code reviews.

30:07:00	Hadi Hariri:	Yeah, I know. Do you actually like doing code reviews?

30:12:00	Florina M.:	I do! I've learned so much through code reviews. Last year at KotlinConf, I talked about Plaid, a bigger sample app that we converted to Kotlin. The app was initially developed by one of my colleagues, Nick Butcher, and then together with him and two other colleagues we've been making it more modern in terms of architecture and converting it to Kotlin. And I've been learning so much just through the comments that my colleagues were leaving or the comments that we were leaving for each other, like, “Hey how about using this function?” or, “Did you check out this thing because this might help you make things better.” And I think that's where I just go to my favorite Kotlin feature, which is all of the collection extension functions. They make my life so easy, thank you.

31:05:00	Hadi Hariri:	I think that it's good to learn things, and it's definitely a good opportunity. It’s just sometimes, when I'm doing code reviews, because now I have to, it just feels like the tooling could be better for code reviews. For me it often feels that I don't get the bigger picture. The scope is very limited, you're often focusing on one line or two, and it really makes it difficult sometimes to get the bigger picture. But maybe I just need to do more code reviews and shut up about it.

31:41:00	Florina M.:	I think it's definitely true. And then it's easy to just get lost in the net. You have a typo in this Java doc, instead of focusing on the actual… I don’t know, is this really happening on the background thread? Is this going to create other issues in other parts of the app? I think that's true. At the same time, when we're talking about specifically about learning Kotlin, I think this helps. I've seen, things like using all of the scope functions better just by looking only local. Of course you also have to look globally at the bigger picture, but I think that's a lot about the discipline that we have as developers.

32:26:00	Hadi Hariri:	Yeah. Just wonder if there's a better way to do it at some point, but anyway. Talking about better forms of writing Kotlin code and idiomatic Kotlin, it's good to mention one of the things that you put together yourself personally, kudos for that, the Refactoring to Kotlin hands-on lab, right?

32:45:00	Florina M.:	Yeah. We tried to look there like, okay, how do I actually get started with Kotlin and go through the problem that so many developers have out there going from Java to Kotlin? You know, you're refactoring and you see your IDE has done some magic there, and you wonder why. What's with all of those exclamation marks and what do they mean? What we tried to do in this code lab is to see what the automatic converter did and why, and also how to make it more idiomatic. And there we also tried to give a bit of guidance, not just saying like, okay, make sure you get rid of the... “bang bang”, but rather think about nullability, think about what nullability means in the context of your application because nullability should be meaningful. So we tried to combine best practices as well.

33:45:00	Hadi Hariri:	And I've reviewed that code lab, it's very good, well done for that.

33:49:00	Florina M.:	Thank you. When we're thinking about Kotlin, we want to make sure that we're going outside of our usual bubble. So we didn't stop with just translating things to Kotlin, we also translated it to Chinese and Brazilian Portuguese.

34:12:00	Hadi Hariri:	Wow.

34:13:00	Florina M.:	We had the original code lab in English, of course, and then we wanted to help developers from other countries or from countries where English is harder. For example, with Brazilian Portuguese, we worked with two of our Google Developer Experts from Brazil to have this converted and make sure that it's as idiomatic as possible in Brazilian Portuguese.

34:42:00	Hadi Hariri:	Cool! So what's next for you?

34:44:00	Florina M.:	I don't know. A bit of Kotlin/Everywhere. I'll be going to South America to speak at a few Kotlin/Everywhere events. One of them is in Brazil, in São Paulo. Then I’m also going to Santiago in Chile to the DevFest and also to another Kotlin/Everywhere event in Buenos Aires. Unfortunately, we don't get to support communities really all over the world, I'm trying to do my part in supporting South American communities in this case.

35:18:00	Hadi Hariri:	Yeah, definitely. That's really cool. Recently, I've done South East Asia, but on my list of to-do is definitely South America and Africa. I would really love to go, and people keep asking me, and it just never seems to work out. But that's on my to-do list.

35:40:00	Florina M.:	It's amazing seeing all of these developers that want to organize Kotlin/Everywhere events. I wish I could go in person to all of them and support them. It's amazing to see their enthusiasm. I wish we could clone me when needed or do this automatic transporter thing so that I don't need to fly between events so we can really help developers all over the world.

36:10:00	Hadi Hariri:	And save on CO2 emissions as well.

36:16:00	Florina M.:	Yes.

36:16:00	Hadi Hariri:	Although if the teletransporter was to use, emit CO2, then we would have to... Okay, nevermind. Cool. Sometimes I do go way off track, don't I? The other day I had a thought. I was drinking out of a plastic cup. Not plastic, cardboard cup, and I put on my to-do list to find out if the energy and the waste and emissions that are generated by a plastic cup, cardboard cup, are greater or less than the water and the liquid and the detergent that is used to wash cups.

36:57:00	Florina M.:	And?

36:58:00	Hadi Hariri:	I don't know, I haven't resolved it yet. It's on my to-do list. Do you know it? That would save me a lot of Googling.

37:05:00	Florina M.:	No, I'm afraid not.

37:06:00	Hadi Hariri:	Okay. Well, nevermind, we'll do an episode one day on that.

37:11:00	Florina M.:	Well, speaking of Kotlin/Everywhere events and traveling around the world. I think what helped me at least to be able to go to the South American events is the fact that they are all happening in the span of a week. That meant that I didn't have to go back and forth to South America too much. It meant that I don't need to be away from home for a long time. The fact that we were able to organize these three events so close to each other really helped. Even if it's us, or Google Developer Experts, for example, that can also speak at Kotlin/Everywhere events, as an event organizer, try to see if there are other events happening in the same country or in the same region in a similar date. Or try to communicate with folks from the same regions and see if you can group them so you can make things easier for speakers so they can go and speak at multiple events in the same region.

38:14:00	Hadi Hariri:	Yeah, that's a very good point. Oftentimes when people submit their events, they set a date, and when we're reviewing events, we look at those dates. Maybe next time, if we ever do this again, we should a set of range of dates, or “are your dates flexible?” kind of thing.

38:34:00	Florina M.:	Yeah maybe. I see that for some events folks already booked venues and it's definitely impossible for them to move it. For some, we do get event updates where organizers change the event date.

38:49:00	Hadi Hariri:	Again, coming back to what I was saying, I would love to go to Africa and support some of these many communities. Because it really was overwhelming and wonderful to see so many people in this continent putting on events around Kotlin, and we don't get to dedicate enough time of our lives to them. And we should, right?

39:18:00	Florina M.:	Maybe we should also say that me and Hadi are not the only ones speaking at Kotlin/Everywhere events. We have several folks from DevRel, both from JetBrains and from Google that either spoke or are planning to speak at Kotlin/Everywhere events around the world.

39:33:00	Hadi Hariri:	Yes, for sure, sorry. Totally good point.

39:36:00	Florina M.:	And also we're trying to support as much as possible Google Developer Experts to speak at Kotlin/Everywhere events in their region.

39:45:00	Hadi Hariri:	Yes. And again, going back to one other important thing, this is about the community and fostering the community within each region. So we shouldn't look at this just as putting on an event, but also highlighting all of the people in your community, in your area that are working with Kotlin, getting to know each other, bringing them together, and getting them to participate in these events. That's equally as important.

40:07:00	Florina M.:	Yes. And you know, the type of talks I like best are “this is my war story”. This is how I did this for my app. I like these sharing-your-own-experience talks, and for this you don't need to be at Google or at JetBrains. It's all about talking about what you did, about what you've learned, and what were the steps that you took to learn those things.

40:30:00	Hadi Hariri:	And many times, it's even way more interesting, right? Because at least from our side, on the Kotlin team, we really want to hear about other people's experiences, and how they're using the product. So those are even more valuable.
	Cool. Well, we're running out of time. Well we've run out of time, but it's awesome chatting with you always, Florina. So we're just letting this roll. Thanks for coming on, and I know that you've forgotten to mention it, but just in case you do forget, you also do have a workshop and a talk at KotlinConf, so please don't forget to come to that.	

41:05:00	Florina M.:	Yes. I won't. Folks can register already for the workshops, right?

41:11:00	Hadi Hariri:	Yes. We still have some places left for the workshop actually, but if they're interested, they should register really quick, because I've got a good feeling that that's going to sell out.

41:21:00	Florina M.:	If you're curious what we're covering in the workshop, and it's a full day workshop, check it out, it's all in the abstract. And I think it might be interesting to see what we're composing for that workshop.

41:33:00	Hadi Hariri:	Hmm. Well, don't forget your jetpack. Dudududun. Okay. I will see you at KotlinConf, if not before.

41:43:00	Florina M.:	See you. Thanks for having me, Hadi.

41:45:00	Hadi Hariri:	Take care.


