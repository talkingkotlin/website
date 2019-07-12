---
layout: post
title: "Libraries with Roman Elizarov"
guest: Roman Elizarov
published: 2019-01-28
recorded: 2018-12-19
trackid: 565736889
length: "43:38"
length_rounded: "43 mins"
tags: [Roman Elizarov, Coroutines, Multiplatform, Serialization]
image: roman-elizarov.jpeg
description: "We catch up wth Roman to discuss the state of libraries in Kotlin, the release of coroutines, changes that were brought with it, as well as other activities Roman and team are working on to bring multi-platform libraries to Kotlin."
bio: "Roman Elizarov is a professional software developer with more than 16 years of experience. He had started his career at Devexperts, where he designed and developed high-performance trading software for leading brokerage firms and market data delivery services that routinely handle millions of events per second. He is an expert in Java and JVM, particularly in real-time data processing, algorithms and performance optimizations for modern architectures. Roman currently works on Kotlin language at JetBrains. Having worked on very large systems compromising many modules written in different languages, he has a dream of a single language that can be used to write all parts of a very large distributed system, to share and reuse data models and algorithms without friction. Kotlin with JVM and JS backends and upcoming native compiler is the ideal candidate to realize this dream. In 2000 Roman had graduated from St. Petersburg ITMO. He now teaches a course on concurrent and distributed programming in ITMO. During his undergraduate study he participated at ACM International Collegiate Programming Contest (ICPC). Since 1997 and until now Roman serves as a Chief Judge of Northeastern European Regional Programming Contest (NEERC) of ACM ICPC."

notes: 
    - text: Roman Elizarov on Twitter
      link: https://twitter.com/relizarov
    - text: Coroutines in Kotlin
      link: https://kotlinlang.org/docs/reference/coroutines.html
    - text: Kotlin Serialization
      link: https://github.com/Kotlin/kotlinx.serialization
    - text: Ktor
      link: https://ktor.io/

---

Unfortunately, during the recording Roman had to change location. This caused a slight 
change in background/tone. Apologies!


# Transcript

This text is a transcription of: [http://talkingkotlin.com/libraries-with-roman-elizarov/](https://www.google.com/url?q=http://talkingkotlin.com/libraries-with-roman-elizarov/&sa=D&ust=1562937507998000)  

**[Hadi]** Welcome to Talking Kotlin. On this episode, I'm sitting down again with Roman Elizarov and discussing some of the things happening in the ecosystem around libraries and multiplatform support. Hi, Roman. Welcome back.  

**[Roman]** Hello. Welcome, everybody.

**[Hadi]** So you are actually, I think, the second guest that's been back on the show. So there you go.

**[Roman]** Okay. Thanks.

**[Hadi]** Achievement Unlocked. I'm giving out these different achievements I guess. So how’ve you been?

**[Roman]** I'm doing well. I mean, we're quite busy here, working on the libraries. That's for sure.

  
### Kotlin libraries - latest news.  
  
**[Hadi]** Yeah. And I mean, it's only been about two months since KotlinConf, or even less, I can’t even remember now. And, we made a bunch of announcements there. And you and I were speaking about maybe giving an update on the state of the ecosystem in regards to the libraries, because, I've been traveling around and been in Asia for the past month or so, and a lot of people have been asking me the same questions over and over again. So, despite all the blog posts, and despite the announcements, maybe we should talk about it on Talking Kotlin as well. So here we are. So in terms of the actual libraries, I know that you've been working on a whole bunch of stuff. What is the latest that you've been focusing on?

**[Roman]** So first of all, we've released coroutines which we've been working on. So now we have to, of course, maintain coroutines. With the release, now there’s more people and more attention being given to it and so people are reporting all the weirder corner cases, like “you will do this and this, it doesn't work” and stuff like that. So, of course, we'll be fixing all the issues that people are discovering in the new features. Everything in this release, of course, is getting attention, fixing things, supporting things, getting feedback, and processing. So that's all part of our work, and it's an important part: maintaining the stuff that we’ve already released. We also want to finish the other things we are working on too and bring in some other coolstuff. So one of the biggest chunks of the other things will be working on is, of course, serialization which is still experimental. Now it's like 0.X, it is basically an early preview. And still, even though we're getting lots of interest people asking about their use cases and why they would need it. And obviously, of course, we are concentrating on multiplatform use cases, because it’s no secret that in the Java world and Android world, there is no shortage of great libraries. I mean, there's not much we can add there. I mean, we can add something, but it is not much, because the JVM libraries ecosystem is great and filled with lots of useful stuff. But for multiplatform, that's if you're sharing code between Android and iOS,or between back end and front end, that's where you won't find many libraries, it’s still in the early stages of growth.

So our goal is to help grow this ecosystem and serialization,though it is technically hard, because it has to be a compiler plugin because of various technical issues. That's something we're doing. It's a big chunk of work that we plan on finishing in the near future. We need to go through and clean up the design, work through use cases, implement easyfeatures, and work on the performance, stuff like that. This brings a lot of input output. I mean lots of people notice that, for instance, the Kotlin standard library doesn't really have anything to work with files, to work with sockets, nothing. We have JVM primitives on JVM, but there is no cross-platform primitives that you can use across multiplatform, any would be really Kotlin specific. So also again you need it for serialization,if you are sending stuff, where you send it to, what output would you use, right? How do you send it over a network? That's also something we are working on.

   
### Coroutines release and structured concurrency.  

**[Hadi]** So it feels like you have a lot of work going on in a lot of different areas. I want to actually take it piece by piece. One of the big announcements was around the coroutines release. For those of us that were using coroutines before the release, we had the whole aspect of experimental packages. And you and I were having this discussion at the time, in regards to whether naming something experimental was the right choice, especially given that you're saying that now people are using it and they're giving you edge-cases and corner-cases. Looking back in retrospect, would you do anything differently in how you released coroutines and naming things experimental and packages experimental? Because I believe that now we've introduced some other things in Kotlin in terms of experimental APIs, right?

**[Roman]** So, that was a tough decision that we made back in 1.1, the whole experimental package, but it was necessary for multiple reasons. First of all, the coroutines as a language feature was a big one. It touched on lots of places in the compiler, it added new API to the standard library, and this API was not isolated. It’s not just this one function that you would use somewhere, that would have been easy just to mark asexperimental, play with it, and then decide what to do with it. But for coroutines, the whole set of interfaces, continuation,etc. are everywhere. So they are the core infrastructure that permeates everything we do with coroutines in the bottom layers.

So we basically had no choice. If we included an actual Kotlincoroutines package back then, without all this experimental package stuff then we would have had no choice but to then keep that design, which wasn't proven. And I'd say using experimental and letting the community play with it was instrumental to actually discovering how people use it and discovering various use cases. Even though we still have bugs in corner cases, they're not designed corner cases. It's not like we've fundamentally missed something in the API.It's only in a few rare cases here and there where something is not working as expected. But getting all the use cases we couldn't have done ourselves without the help of the community; the community helped us a lot. A huge chunk of the success of coroutines was because of the great community that gathered around them, started playing with them, and using them in their projects and telling us what works and what doesn't or other problems they see has helped us improve the API and get a feel for where to go.

**[Hadi]** And one of the changes, of course, that you introduced was the concept of structured concurrency, right?

**[Roman]** Yeah that was also worked out gradually. Initially, when we started doing coroutines, we looked around and we looked at how it's implemented elsewhere in languages such as Python, Go, and others. So, for example, there are threads in Java, async wayin C# and JavaScript. And we would basically model after that. So we took some of the failures of other approaches and fixed them, and we took some successful things and kept them. But generally, our initial model was everyone else. You have some asynchronous piece of work to do, you just launch a currenttask and do it. But then,when we started actually being interested in it, because we've done lots of talks and examples over the years. Having released an experimental version helped us, because we did various talkson how to use it. And so we always got good insights into different parts of it.

So, for example, when you want to do something concurrently, in truth,it's not easy to do currently without leaking resources. And we didn’t know this, it wasn't immediately obvious to us that it was a problem. And so it kind of turned into a code pattern that you have to use, that you need to create child coroutines, which is tenuous, you have to always remember about them and sometimes you forget to do it. If you do it your code works, but it doesn't work the right way; it leaks resources and you can have various errors. And over time it became clearly visible that there was a problem in the design and that something had to fundamentally change.

So then we got this idea that we have to always launch child coroutines by default. It has to be default, because it's the right way to do it. Like when you want to do something globally, that you have to be exclusive about the child coroutines has to be a default. So we've figured out that that it should be default and then we stumbled onto this paper from the Python world that basically slaps a name on this concept. The name is restructuring concurrency. Good. The name fits. Perfect. So let's also use the name restructuring currency for this, and that's how it went by this name.

**[Hadi]** And what's been the feedback on this new approach? Are people generally happier? I mean, because I remember that there was a list of design patterns so to speak that you were you just talking about, that you recommended that people would have to follow to manage their resources. So has the reception been better with this approach?

**[Roman]** The feedback was mixed. It was dependent on what people did. Actually to understand why the feedback is mixed, you have to go back again, two years back, before we had any structured concurrency. Before we introduced coroutines most programmers that were programming in Kotlin, were only aware about future based patterns. I mean, whether you programmed in Scala, whether you program in C#, or JavaScript, all you learned was this async way that you run an async task that returned futures that had to wait, and that's basically the only thing people knew. The feedback we were getting was great, in the sense that people started using coroutines initially in this async way of writing things.But then they gradually discovered that they don't have to do it, they just can use suspended functions, and it made the code simpler, more readable, and nicer looking.

Then two years ago, we got this great feedback from our early adopters, like “I've removed this weight, the last future typeI had in my code base, and the code is so much easier and better now”, without any mention of any future type. People who learned how to program without futures, they were very positive about structured concurrency because with structured concurrency, it became even easier. Because when you do concurrent things you have to remember about children etc. etc.

But there's another reason why feedback was mixed, it’s because there's another group of people that only get exposed to coroutines in their first experience, they have never seen them before. The only thing they saw before our futures are those asyncs in waits that you have slapped all around your code. When they came to coroutines, we start to see it when they started using some async way that doesn't work with structured concurrency, it doesn't work that way they used are to it. So they get confused and that's the mixed feedback. So again, when they learn that they don't need to wait at all and they should write their code without it, all begins to clicks to them.

But this initial experience, when they start  writing in their old style and it just doesn't work the way they are used to, that makes them ask all the questions over Stack Overflow or come to issues. That's something we still know exactly what to do about. We're trying to do more education, more guidelines, more inspections, to help people out. But it’s a problem we're aware of and we're thinking hard on how to make it easier for those people very new to this concept to understand it.

**[Hadi]**So one of the promises that was mentioned when introducing coroutines to people is that, you don't have to really learn a new set of APIs, or a new way of thinking or a new paradigm in how you deal with asynchronous code. Do you feel that over the years since you started working on coroutines this promise has been kept? Because I have seen a few comments here and there, kind of like reflecting upon this, saying “oh now I've got to learn three different things, or four different things, around how to deal with coroutines in Kotlin”.

**[Roman]**It's hard to tell. So again the feedback on eachside is different. Some people say, “Oh, it was so great. I mean, it immediately worked out and my code is so nice”. Other people say “Oh, this is a very hard concept and I can't figure out why it doesn't code”. And frankly, I really have no idea, exactly, how to nail down why some people are like that, and others are the other way. But I think I have a small clue. The clue I have is this: if a person has prior experience writing async APIs using callbacks, preferably. Basically, if a person has worked with callback based API, for example, in Android, where there are lots of callback based API, or they did some enterprise stuff and relied on callback based APIs to do asynchrony.

These people usually because they were taught asynchronous programming in university, and they had a course, where they played with callbacks and stuff like that. These people who have had prior experience working with asynchrony.When they get exposed to coroutines, it immediately clicks with them and they see how much better it is. It is easier, more readable, and the code is obvious, you don't have to write this callback mess etc. etc. So they are happy.

But when a person without any prior asynchronous programmingtries to start they find it hard, they don't understand what's going on. I don’t think we can attribute this to the coroutines themselves, because coroutines are the simplest way to do  asynchrony. I attribute it to the inherent complexity of asynchronous programming. So, to help these people we should not be concentrating on teaching coroutines. We should concentrate on explaining what asynchronyis. So they understand asynchrony. When they understand asynchrony,then coroutines come as a natural and easy solution to working  with asynchronous stuff.


**[Hadi]**Of course this is all around the coroutine stuff. But you mentioned other libraries that we've also been working on and in particular, serialization is something that you've been working on for a number of years now. Or at least this last year a little bit more, right? What is the state of that in terms of release?

   

**[Roman]** Well this is still far away. We're right now expanding the scope. We support all backend. It started as this JVM onlyproject and was in this state for quite a while, but then we expanded. So now you can utilize anything in JavaScript, JS, and native. We're still ironing out the API. So there is a lot of time being spent on design, cleaning up use cases, and checking corner cases. I can't promise anything in terms of a release, but what I can say is it's really high up on our list of priorities. We really want to finish it in a reasonable time, finishing and actually make it to 1.0 work, and saying “this is serialization” we support. So far the feedback seems positive and there's no like discussions of not doing it or dropping it. We are on track to do it and get it to release.

**[Hadi]** And you said that serialization is also supported for Kotlin native.

**[Roman]** Yes.

   
### Supported protocols in Kotlin.  

**[Hadi]** Okay. And what type of protocols are you currently supporting? You are supporting JSON, and what else?

**[Roman]** So right now, out of the box, we support JSON and Protobuf that’s two protocols, they get out of the box support from us. We are also thinking about adding XML as kind of a built-in package. That will be the three core protocols that we’ll support. But the design itself is flexible in the sense that anyone with an external library can write their own implementation of their own protocols. Some people are already contributing, for example, we just got YAML contribution recently.

Well basically, the person said here's my external library that supports YAML. While writing all those solutions is somewhat harder than just using serialization and the API for writing that is still evolving a bit, that's the part of design we want to finalize. But the idea is that once we hit 1.0 and we can finalize all the API, there's no plan to providing all the protocols in the world. So we'll support this core set of basic protocols.

And anyone can have a library of supporting “my great protocol X”. The great thing about it is, you can write this library in pure Kotlin, using Kotlin serialization and get this protocol support on any platform from native, JavaScript, or JVM.


### Serialization in Kotlin.

**[Hadi]** Well, I mean, one of the questions I was going to ask you is, why would, if I'm using the JVM, okay, and I'm not doing multiplatform, why would I use Kotlin serialization over some of the other libraries that exist?

**[Roman]** There are pros and cons. Let me explain. The advantage of Kotlin serialization over JVM based libraries, is that it natively works with Kotlin types, it supports all the key Kotlin features like nullability, building, and it won't let you initialize into non-nullable files.It also supports default parameters to properties, so you can make it option and it will get initialized with whichever default you write.

And, it also supports the Kotlin type system and knows if you have a list of your data classes that's statically known to be a list of data.You don't need any dynamic type information when reading or writing this list for each of your data classes. So in the general design of Kotlin serialization it's focused on security and static typing, in the sense that if you want any kind of dynamic class or any kind of polymorphismyou have to obtain it. It's not on by default. So by default is completely secure. It only writes classes exclusivelyannotated serializableonly reads, with complete 100 percent type safety. There's no read any class from my class, that happens with many other serialization. So that's its advantages. There are, of course, downsides too. There is no plan to support every conceivable feature of other formats in Kotlin exclusively. So you might find yourself in a situation where some other JVMlibrary has this baroquefeature that you're using, and it's not supported by Kotlin serialization. Such as some weird mapping between classes, for example. But even though it's not supported out of the box we're keeping our APIs flexible enough so you can implement it yourself if you really need to.

**[Hadi]**And one of the disadvantages I was going to say in a sense is that it required a plugin, but that's no longer required, right? But now the Kotlin plugin itself has support for it, yeah?

**[Roman]**Yeah, so it still requires a plugin. The difference is that we now bundle the plugin with the compiler. So we used to have these version compatibility problems, so you would have to use this version with this specific compiler version. Now the serialization library, though it is experimental and not released yet, is bundled into the Kotlin compiler.

So you don't run into these compatibility problems with it compiling itself and serialization. This makes the whole process of using it so much smoother now, and it is supported in the IDE, so it's easier to get support with the build script, because of the plugins bundle,

**[Hadi]** And why the need for it. Why would you need this plugin?

**[Roman]** So it is basically because of two requirements we have. One is multiplatform, because in multiplatform it's also only JVM where you have reflection. Neither JS, nor nativesupports reflection and there is no immediate plans to support reflection in them, because of performance, because supporting reflection in a general formin runtime or in the language adds lots of weight to it. That's one of the reasons that JVM applications can never be small they're always pretty big whatever you do to minimize them. Just because JVM has to support reflection in order for all your nice JVM frameworks to work.

So, in JS and Native we want to keep it small, so we don't support reflection and then we can do serializationthe usual way, and do it through reflection. We have to pre-compile all the serializers for allyour classes and that's what the plugin does. And now, because we do this for JSON and native, it also it makes sense to do it in JVM. On JVM we could have done it through reflection, but we need ahead of time through the plugin which gives us faster start up, and gives us potentially more performance because you could write reflection based on JVM that would create those classes on the fly. But that then again slows down the startup of your application. So here, because the plugin pre-compiles then serialize it for every class you can immediately start writing and reading them.


### Coroutines & Kotlin/Native.

**[Hadi]**Now, speaking about actually Kotlin native and one of the things that I forgot to ask you regarding coroutines, which often comes up: What is the status of coroutines targeting Kotlin native?

**[Roman]** So the current memory model in Native is that it's more JavaScript style. So you have these single threads, and you have isolated workers that can only exclusively communicate with each other by sending individualuse. So in this world, this is the way coroutines work. They also work in JavaScript, so if you have a UI application for iOS, for example, then in your main thread you can do coroutines. You can communicate with me and have no problems. But, in the current released version approaches you can't even create an event loop in any other thread. It's not going to work in the version we have now, but that is going to change.

So in the upcoming release which is going to be out really soon. You'll be able to have separate event loops in different threads on Kotlin Native and do any number of coroutines in those threads. However, if you want to communicate between coroutines and different threads you'll still have to do this explicitly, by transferring objects; It's kind of hard now. It's something that's we're working on to fix both in the libraries team and Kotlin team. I can't give any details there’s still more research work we can do but we're definitely working on solving this particular problem to make cross thread communication in Kotlin native easier.

**[Hadi]** But is the ultimate goal that, me as a developer, use the same programming model and the same APIs independently of the platform I'm targeting? Or is there ultimately going to be some differences based on the specific platform in the case of Kotlin native?

**[Roman]**So is the goal we have is for a common code. So what we're trying to do is to make sure that you can write Kotlin code that just compiles in different forms and just works. But, it doesn't mean it works the same in every platform.

So our goal is this and we’ve identified a number of patterns of how people actually write their code, for example, in mobile applications the usual pattern is that you have this main thread where you do all the UI stuff and then you offload some of your heavy CPU heavy computation in background. You use it with the code as you did with context, you use part of the default or your own thread, and then you do some heavy computation there offloaded. Our goal is to support these kinds of pattern on both JVM and native.

So, I mean, we might use a different mechanism behind this, right? But the goal for you and us as a developer is just write the code, run it, and it works. I mean, if you do something wrong, if you run into arrays or something or create arrays in your code, or do something like this, then it may fail in different ways. So we don't guarantee that wrong code behaves in the same way in different parts. What we're trying to do is follow established patterns of writing this code and then it works the same way in different platforms.

**[Hadi]**Okay. I guess that's fair. Okay. So now we've covered coroutines and the state of that, and we've discussed serialization, but there's other things. And this is something again, that pops up, say I'm targeting multiplatform projects, I'm going to need a bunch of infrastructure code that is essentially needed across multiple platforms, which is that the idea behind having multiplatform libraries, so to speak, right? And so some of the other things that you're working on, what are these? I mean are we working on? We spoke about having an API for dealing with files, dealing with data, dealing with logging, are these things that the community should wait for JetBrains to deliver or is this something that JetBrains is hoping the community will deliver? How is that working?

**[Roman]**So the foundational stuff that we mentioned, like input output, data logging, that's something we plan to work on. So we have actually started working on the input output stuff, and it has version 0.1 and is actually used internally, and we are ramping up development to finalize it to 1.0 release for all the input output primitives. We are also starting to work on dates and times, it’s something we realise we are a bit late with and especially because it's so foundational, we can expect this come out from community.

We haven't started it yet, but we also plan to provide some logging and other really foundation libraries that everybody needs. Well, of course, we expect from the community to work on all the domain specific things. And we're actually happy to see this already happening, you know, that people are working on a data science library, association library, and things like that; some domain specific things that they need for their domains. And this is a great thing for the community to take on.

**[Hadi]**Yeah. And just recently, I was talking to Kevin Galligan who's done a bunch of things around multiplatform, and this topic came up, and I'd like to get your opinion on it as well. That one of the selling points of Kotlin has always been around the idea that you don't need to reinvent the wheel, right?

You know, if you're talking to the JVM, we interop with the JVM, if you're doing Kotlin native we're going to interop with C, if you're doing JavaScript, we’re going to interop with JavaScript. How much of this contradicts? Now people saying “oh now I've got to wait for an ecosystem to flourish for me to do multiplatform”. Do you see what they mean? I don't, but I would like to see your opinion on this. Do you see any kind of contradiction with this idea of leveraging and interoperating with existing things?

**[Roman]**Oh they don't complicate, but rather complement in the sense that whenever we're doing any multiplatform stuff, we make sure that each piece on every position, onevery platform actually interops with the established practices on it. Look at how Kotlin test works, in JVM it works with JUnit tests,on native it works on some Google testing framework, on JS it works with all the major JavaScript testing frameworks and we are using the same approach in all the foundational stuff we do. One of the goals is to make sure that whatever library we do for Kotlin interopsas well with the JVM world. We take a look at the files so we have some sketches in their files area, preliminary ideas, and also one of the goals is to make sure it interops well with everything that you can do with JVM and native it has to interop with all of them. So it's not like we're reinventing the wheel. We're not rewriting things from scratch, we're just we're working on multiplatform libraries. We're mostly providing this kind of this Kotlin glue to the things you can only find on this platform.

**[Hadi]** Right? So basically, in a similar way, would you say it's kind of like how people started to provide a Kotlin API to some very common JVM based libraries, right?

**[Roman]**Yes, exactly. That's exactly what we're doing. Just on a more foundational level. I mean in some ways you have to add some layer and some platform. Even though they may not exist. So it has to be largely from scratch. But still, the general idea is that for those kinds of foundational things we want to leverage as much as possible from the platform and interact with it.


### Kotlin & HTTP.

**[Hadi]**Talking about foundational things. One other one is, of course, HTTP, and namely a HTTP client. How is the status there? Because I know that that kind of falls under Ktor, right?

**[Roman]**Yes. So it's stable with Ktor1.0., the only thing that we're finishing up is full multiplatform support for web sockets. So Web sockets, is something that still lacks, it's not that it doesn't work on our platform, but that it needs finishing up, you should be a client itself, fully supported everywhere, and you can use it for Linux, Windows, Mac, JavaScript, JVM, Android, it uses whatever underlying HTTPengines areon those platforms, it's not a reimplementation of the HTTP stack it’s just a Kotlin style API on top of the existing platform’s HTTPengines.

**[Hadi]**So kind of like, for example, on native is using lip curl, right?

**[Roman]** Yes, on native it was using lip curl, on iOS it’s whatever framework Apple has for HTTP, for JVM it uses just HTTP real connection, right? On Android you have an actual choice between that and using HTTP.

**[Hadi]** So that this is more or less ready now? Because I'm really going to need to use this at some point.

**[Roman]** It is released already. So you're absolutely welcome to use it.

   
### Kotlin & AtomicFu.  

**[Hadi]**Awesome. And so other than the serialization and coroutines and all of these things that we've mentioned. There's also another thing that you've been working on which is AtomicFu. Can you briefly explain what that is about?

**[Roman]** So we still we did not use it in 1.0. maybe not in any time in the future either. So we're keeping it experimental for a while because it's mostly for our own needs. And the reason we have it is that when we write language for different platforms, so especially in coroutines, sometimes we something specialized concurrent help for some reason,but in a structure that simply did not exist in JVM or anywhere else. And, it's easier for us instead of writing those algorithms for different platforms, because that’s hard. It is hard merging the same code, because the conversion models are different on JVM, JavaScript, and native. JavaScript doesn't have spreads at all, and it needs a different approach and JVM has its own approach.

So the idea was to have this library that lets you write your code and your concurrent log algorithms in a common code, and then just compile two different backends and then compiler does the right thing. And actually, the reason we're not releasing it because, it's not very easy to use, because it’s not even a compiler plugin, it's like just postprocessing step that actually takes compiled code and tweaks it. So it has a bunch of these weird limitations on what you can and cannot do. And it's okay for our use, as we understand it, but it is not okay for the wider public. And again it is designed for people who write really low level stuff, like these things that lock free really fast like you that need for a coroutine scheduler. And so, it's really designed for people that are experts in this area. So we're not going to add this additional complication of limitations to understand there, mainly because it's not really targeted to the general public

   
### About Kotlin Library Team and Community.  

**[Hadi]** I see, makes sense. How many are you now in the Kotlin library team?

**[Roman]** We're still a small team. So they're like six people working right now on libraries. We're expanding though, so we're hiring more because we want to do more. So we have actually lots of on our plate with things that we potentially want to do. So we not only want to support everything that was released. We also want to start new things.

**[Hadi]** With all of this is open source is there the equivalent of low hanging fruit that people from the community could contribute to and help build these libraries up?

**[Roman]**  From our experience the best help we get from the community is in the identification of their use cases and showing us a corner case or when something doesn't work for them and explaining what their use case is, that actually helps a lot. It also helps when people open our GitHub project we're working and look at the issues, there's always some small issues that are up for grabs that anyone can do. We’re happy when people take them and you know, implement them or fix bugs, there may be some weird bugs that have been sitting around for a while, because we don't have time to fix them and it really helps when people take them and help us with them.

**[Hadi]** And all of this falls under the Kotlin X organization on GitHub, or is there going to be some things under Kotlin or JetBrains? Or how is this going to be organized?

**[Roman]**Okay, so let me explain. So first of all, there is an elephant in the room that we forgot about, and the elephant is the standard library, which we’re also working on. It’s also what our team is working on and there is lots of work to do in the standardlibrary itself, like missing collection APIs, and stuff like this. And like various utilitiesthat are really fundamental to any kind of program that you are writing. But, we're trying to keep the standard library small. One of the reasons to keep it small is because Kotlin is so multiplatform now. There are really not that many APIs that really matter everywhere. Even to do with basic things like files. You might think that everyone needs files but it is not this way, in JavaScript there are no files. So file API doesn't make sense in JavaScript. So the plan is then to keep the standard globally focused only on those really core things like collections, text processing, and things like that.

The things really every application deals with and keep the other things as a separate libraries and then introduce them from the standard library, or that come bundled with Kotlin. We call them Kotlin X, it just makes it easier for this distinction. However, they’re still maintained by JetBrains, and the plan is ultimately to integrate all the documentation learning resources right into the main Kotlin site. So on GitHub, Kotlin has these text libraries that live in collectivisation in Kotlin/GitHub, and they will ultimately be merged on the main Kotlinlang.org website, with API reference, tutorials etc. Because they're also maintained by JetBrains, so it doesn't make sense to keep it all in different places.

The only different separate organization we have is for Ktor and Ktor is an umbrella for all the stuff connected to HTTPand around it, and so you see a huge chunk of interrelated libraries basic to the client, to the server, in all the other HTTP, base protocols, web socket, and stuff like that. And that has its own separate organization because of the sheersize of it, and the sheernumber of things. So to glue togetherall the things separated, because Ktor is even though we go to libraries, it’s more like aninside framework. So it's like this.

**[Hadi]** Right. But I mean, wouldn't that be a little bit confusing for someone to know, I mean not knowing that Ktor is where I get the cross platform library for HTTP connections, whereas Kotlin X is where I would find it for dealing with files or logging?

**[Roman]** Yeah it might be confusing. But we didn't find any other good way to work on it. So we could have picked the HTTPstuff out of Ktorand integrate it into the standard library or a separate Kotlin site. But the problem is, it's so interconnected with all these HTTPAPIs there. So I really want to have this seamless experience, especially for micro services. So when you have a microservices receive a HTTP request and then send a HTTP request to some other service, we want all the APIs to be the same, so you don't have to learn many concepts. So because right now, in the modern world the problem you have is this one server API different client API, now we have to mix and match those different header formatsit is too much stuff you have to keep in mind. We want to simplify the learning curve by using the same API across the board.  But this basically forces us to keep it separate so we can evolve all those things together. But for figuring out what's what in the Kotlin language to work we should definitely list all the resources and should provide people with a base overview, like you need this go here, if you need that here that, something like that will definitely be added.

**[Hadi]** We are running way over time, because it's always awesome chatting to you Roman. So thanks again for coming on, and all the best of luck with all the big projects that you've got ahead of you and delivering on all of this. I do wish you the best of luck on that, because a lot of people are waiting for it.


**[Roman]** Thanks so much.
