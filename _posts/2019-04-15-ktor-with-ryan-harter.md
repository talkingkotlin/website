---
layout: post
title: "Ktor with Ryan Harter"
guest: Ryan Harter
recorded: 2019-01-24
published: 2019-04-15
trackid: 606188484
length: "40:16"
length_rounded: "40 mins"
tags: [KotlinConf, Ryan Harter, Server-Side, Web Development]
image: ryan-harter.jpg
description: "We talk to Ryan about Ktor, the asynchronous framework for connected systems, developed and maintained by JetBrains. We talk about how it can be used for developing server side applications and its differences with some other existing ones."
bio: "Ryan is the lead Android developer at Pixite, where he works on creative apps and everything that's needed to support them. He's a Google Developer Expert for Android and Kotlin, and loves making apps and services that delight users."
                                                                                                                                                                                                                                                                                        
notes: 
    - text: Ryan's KotlinConf Talks
      link: https://www.youtube.com/watch?list=PLQ176FUIyIUbVvFMqDc2jhxS-t562uytr&v=V4PS3IjIzlw
    - text: Ryan on Twitter
      link: https://twitter.com/rharter
    - text: Ryan's blog
      link: https://ryanharter.com/
    - text: Introduction to Ktor by Hadi Hariri
      link: https://github.com/hhariri/ktor-samples/
---

## Transcript

0:00	Hadi:	Welcome to Talking Kotlin. On this episode I'm sitting down with Ryan Harter discussing Ktor. Hey Ryan, welcome to the show!

0:20	Ryan Harter:	Hi Hadi, thanks for having me.

0:22	Hadi:	Are you at all related to the, er, otherwise known as Ryan Hunter?

0:26	Ryan Harter:	(laughs) I'm not, we've never met in person.

0:29	Hadi:	OK. It's just that he was on the show 10 seconds ago, and (laughs) yeah.

0:29	Ryan Harter:	(laughs)

0:33	Hadi:	We just did a retake because I was saying Hunter, instead of Harter, shame on me. Hey, I've been called worse things, OK? I'm—

0:33	Ryan Harter:	Yeah.
0:39	Hadi:	—not saying that Harter or Hunter is bad, I mean, people call me Heidi, Hardy, anything that you can think of.

0:46	Ryan Harter:	(laughs) Yeah, it happens.

0:47	Hadi:	Yeah. I don't know, but isn't there like a famous actor called Ryan Hunter or something like that?

0:53	Ryan Harter:	Honestly, not that I know of. I don't know. (laughs)

0:54	Hadi:	Oh, OK. I don't know, Ryan just kind of… anyway, never mind. All right, we're Talking Kotlin here, we're not Talking Names. So, you were at KotlinConf, you were talking on Ktor, which apparently—

1:11	Ryan Harter:	That's true.

1:11	Hadi:	—went down really well, because you got awesome feedback on that, so well done, congrats on that.

1:15	Ryan Harter:	Yeah. Thank you.

1:16	Hadi:	And we've had quite a bit of usage of Ktor, so to speak, I mean... To give some background to people, Ktor was born out of Wasabi, something that I was working on, and last I looked on the Slack Channel – if we're going to measure interest in Ktor by Slack Channel, as opposed to Stars and GitHub – it was over a thousand people, I think, on the Slack Channel. So yeah, and we've had quite a bit of demand, people inquiring about Ktor, so I'm like, "Why don't we bring Ryan on and discuss everything Ktor?" Because you've been using it extensively, right?

1:58	Ryan Harter:	Yes, yeah.

2:00	Hadi:	Cool. So tell us, what exactly is Ktor?

2:04	Ryan Harter:	So Ktor is a framework for building servers, and clients, so this would be for your web backend, or you can even use it in apps. I'm an Android developer by trade, so apps is sort of how I think, but a lot of what I do is write backends for those apps. And Ktor is a real lightweight framework all based in Kotlin, it works really well with – or based on, I should say – coroutines. So Ktor just makes it really lightweight and easy to make backends.

2:42	Hadi:	And it's built from the ground up with Kotlin?

2:45	Ryan Harter:	That's right.

2:46	Hadi:	OK. So, a lot of people are used to working with web frameworks... I mean let's kind of divide this up into multiple areas, because—

2:56	Ryan Harter:	OK.

2:57	Hadi:	—you mentioned client side, and you mentioned server side, so let's take this one by one. So if we're looking at the server side, you know, one of the fortes of Kotlin has always been “use existing frameworks,” “use whatever there is there.” You want to use Spring, you want to use Vertx, you want to use whatever – it's all there. And even with things like Spring, there are a whole bunch of adapters that the Spring team themselves are now maintaining that are making things a little bit more idiomatic to Kotlin.

3:28	Ryan Harter:	Sure.

3:29	Hadi:	So apart from the fact that Kotlin is built from the ground up in Kotlin… sorry, no – Ktor is built from the ground up in 
Kotlin – so why would I use Ktor as opposed to something like Spring?

3:49	Ryan Harter:	Well, from my perspective, Ktor just makes things really easy and simple. It's highly performant, because it's all coroutine-based, so it does a lot of really good load balancing of all of your server-side work, and everything sort of plugs together. You have features that you can plug in to your servers if you want to add header logging, or you want to add authentication, or those types of different features, it's very plug-and-playable.
		And while I don't want to disparage the Spring community, and I haven't worked with Spring extensively in recent years. You know, Spring is a lot about configuration, and that side of stuff, and Ktor just does that in code. Which from my perspective makes it really fast and easy, and easy to reason about.

4:44	Hadi:	I mean, in all fairness to Spring, I think that a lot of that is now done kind of programmatically, if we're talking about something like Spring Boot, as opposed to—

4:52	Ryan Harter:	Sure.

4:53	Hadi:	—as opposed to Spring. Previously I briefly mentioned this, but also to bring some context... I mean I'm not saying that Ktor is based on, or it's a copy or anything like what I had done initially for Wasabi, but just to give some context to people… You know, I used to work on Node.js for quite a while, and on Node.js there used to be a framework called Express.js, I don't know if you're familiar with it by chance.

5:26	Ryan Harter:	Yeah.

5:27	Hadi:	Yeah, so Express.js was kind of similar to, I think it was, what was it from? Uh—

5:33	Ryan Harter:	Sinatra—

5:33	Hadi:	—Sinatra, exactly—

5:35	Ryan Harter:	—from the Ruby community.

5:35	Hadi:	—from the Ruby community, and then you had Nancy in .NET, they had made it like a C-sharp port with Nancy. And well, when I was starting out with Kotlin, I thought, "Hey, you know what? I'm gonna try and throw something like Express.js together in Kotlin," which gave way to Wasabi.

5:35	Ryan Harter:	OK.

5:52	Hadi:	Why was it called Wasabi? Because I love Wasabi peas, so...

5:52	Ryan Harter:	(laughs).

5:56	Hadi:	There are a lot of other things I love, but I don't name frameworks after them. But anyway, and then we were talking with Ilya, so this was very lightweight, right? This was a very easy way to define your routes, trying to explore the DSL aspects of it. And then from there Ktor was born, and I kind of abandoned Wasabi, and you know, the efforts went into Ktor. So I think it's also a little bit trying to explore as much as possible, like the idiomatic ways that you can write things with Kotlin, right?

6:28	Ryan Harter:	Yeah.

6:37	Hadi:	In terms of… to give people some context, I think it, maybe it makes sense to explain how the routing, for instance, is defined when you're doing, when you’re dealing with Ktor.

6:52	Ryan Harter:	Sure. Yeah, and I really like what you said about, you know, mentioning other frameworks. I tend to think of Ktor as sort of analogous to Sinatra in the Ruby world.

7:02	Hadi:	Yeah.

7:02	Ryan Harter:	You know, as opposed to Rails or some larger heavier framework. Routing in Ktor is actually really similar to Sinatra if you've used that before. Basically the way it works is you have, on your server your application, you have a DSL that you define where you get to sort of define all of your routes. You can say, you know, you just give it a path and tell it if it's gonna be a POST, or a GET.
		And then inside that block you put your code, if it's going to call out to external services, or anything like that, and then you can just respond. The simplest thing you can do is just make a GET route, and you know, this is just a block in Kotlin. You give it a path as a parameter, and then you just respond with some text, or some HTML, right inside there.

8:00	Hadi:	And this is a function, right? Like the GET is essentially a function.

8:00	Ryan Harter:	Yep. Exactly.

8:04	Hadi:	Right, a higher-order function that takes a lambda, so essentially you would have GET, and then some parameter which would define the URL, and then you respond with a lambda to that URL, right?

8:07	Ryan Harter:	Exactly, yep.

8:16	Hadi:	And that actually raises an interesting question, which a lot of people ask. I mean, if you're familiar with Express.js, this was kind of like an "issue". If you take something like Spring, or Spring Boot, you have the concept of controllers, and then controllers are somehow aligned with segments of the URL. Some people align it with the concept of a resource, so you could have, for example, a customer controller which would correspond to the segment customer on the URL, and then you would have the different verbs on this customer, right?

8:29	Ryan Harter:	Mm-hmm (affirmative).

8:54	Hadi:	But you would use this class customer controller to group this functionality. Do you often face this issue in Ktor? If everything is like a function, how do you actually group functionality, how do you allocate everything that has to do with, I don't know, customers? Do you put those in or are all those functions defined in a single file called “customers”, or do you still use the concept of classes and put those things in a class? Is it even possible to do something like that?

9:27	Ryan Harter:	That's a really good question. So, the way that I do it in the projects that I've been working on, is I've been really trying to leverage higher-order functions, and some features of Kotlin like extension functions, and that sort of stuff. So what I've been doing actually is I'll have separate files for what might be different controllers, so users, or items, Foos, whatever those are. I'll have different files, and they'll generally have a public higher-order function in them, which is actually an extension function of a route, or routing, and then what I can do is in my main application I'll simply apply all of those.
		I'll have my routing block, which takes a lambda, and this, inside that lambda, is the router. Then I would just call these extension functions on that router. So I might say, add users, add items, whatever that is, and that would add all those individual routes. And then what's nice about the DSL structure of Ktor is that routes can be easily nested and that sort of thing. So what I generally do inside there is I'll give that base path that you might have, so it might be /users, whatever that is, and then I'll add in my routes underneath that for GET, POST, PUT, anything else I need there.
		What that allows me to do is to easily break up these components into more conceptualized components, into what they might be. But it's a very flexible structure, none of that is actually required. That's something that I just do for convenience.

11:32	Hadi:	Right, so essentially what you're saying is that you're using an extension function, inside that extension function you're actually defining the different routes for a specific resource. And then your routing table, which is set up in the main part of the application, is calling that extension function to apply those routes, yeah?

11:55	Ryan Harter:	Exactly.

11:55	Hadi:	Oh, and then you mentioned that the routes can be nested—

11:55	Ryan Harter:	Yeah.

12:01	Hadi:	—so, say you have “/users”, and they have GET, POST, PUT, DELETE, et cetera. But can you have inside the “/users” a sub-route which is like “users” and “/special”, and then have your GET, POST, PUT for those special ones, for instance?

12:18	Ryan Harter:	Absolutely, yeah. Actually, in my KotlinConf talk, I was doing a subscription management system, so you would have users who have subscriptions. Actually, in my routes, I go as far as to have routes that look like “user/userID/subscriptions”, and parameters can be included in paths, just like in any other modern framework. And those nested routes, there are higher-level routes at the “users” level, there are routes at the “user/ID” level to act on a specific user, and then “user/ID/subscriptions” actually gets you other routes to add, remove, or list subscriptions for a specific user.

13:10	Hadi:	One other thing you mentioned is this concept of features, so what exactly is a feature in Ktor?

13:17	Ryan Harter:	So, at a high level in Ktor you have an application, and the application is what's serving requests and responses. An application is built on a pipeline, so a request comes in, it goes through a pipeline that might modify the request – you know, add headers, authenticate, whatever – and then it ends up at your routes, and then it exits as a response through another pipeline. And all of the items along this pipeline that are going to modify your requests, or your responses, or any of that – those are all features.
		So, different features that you might have, for example, a feature to add compression support. So that all you have to do, if you want something like gzip compression on your responses, if you have a JSON API, or something like that, is you just call “install compression” and it automatically inserts the compression feature into the pipeline so that you don't ever have to worry about it. You just return “text”, and on the way out it's going to compress that using gzip compression or some other compression mechanism before it’s returned to the client. And the same thing on the way in, it'll decompress compressed content.
		There are all sorts of other features, and that's what really adds to the flexibility of Ktor, by making it really pluggable. So for a lot of the main features that I use in development, there's a call-logging feature which will just log to the server logs all of the requests and responses, so things are really easy to debug. There are default headers, which add a whole lot of timestamp-type headers to your requests and responses. Compression, which I mentioned.
		Status pages is a really big one for web servers. So that says if, inside my route, if I throw an unauthorized exception, then the status pages features know how to handle that, and actually respond with an unauthorized page. The same for not found, bad request, anything like that.
		And then you can also add some really useful stuff, for instance, GSON or Moshi, JSON deserialization, or XML serialization, whatever you want to use, you can add that as a feature, so that by the time your code actually gets an object, it's already been deserialized. And you don't have to worry about serializing it on the way out, and reading headers to figure out what types of serialization the client understands. The feature, you just plug it in and it takes care of all that for you.

16:05	Hadi:	That gives way to two questions. One of them is, I'm assuming that anybody could write a feature, right? I mean this is extensible, right?

16:15	Ryan Harter:	Yep, yep, absolutely.

16:16	Hadi:	And for, again, trying to compare it with other frameworks that people would be familiar with, and especially in our case where both of us have worked with Express.js… ‘Feature’ here is equivalent to what's known in the JavaScript world as middleware, right?

16:34	Ryan Harter:	Exactly.

16:35	Hadi:	OK, because I mean this is a term that is used quite frequently both on the .NET stack and on the JavaScript stack. Back in Wasabi I named them interceptors, and now they are essentially called features. So the other question was, you mentioned, for example, I have JSON serialization, right? There's a feature that gives me JSON serialization, yeah?

17:02	Ryan Harter:	Yeah.

17:02	Hadi:	So, when a request comes in, will it automatically deserialize, like if I'm submitting a POST request with the body, will it deserialize that JSON into a data object for me?

17:18	Ryan Harter:	Yes, exactly, and that uses generic types to determine how it can be deserialized.

17:28	Hadi:	Right. And then it can serialize on the way out as well, right?

17:32	Ryan Harter:	Yep.

17:33	Hadi:	OK. So the next question is, what serialization library does it use, and is that pluggable as well?

17:40	Ryan Harter:	That's completely pluggable. The feature itself is called content negotiation. It seems a bit cryptic at first, but really what it's doing is it's negotiating with the client to determine the features that the server supports, the serialization mechanisms that the server supports, and what the client can accept. And so that's where content negotiation comes in, and then you can actually plug in multiple different serializers, or content negotiation converters here, for different types of responses.
		So you can have GSON, to serialize and deserialize your JSON requests. You can plug something in that'll take care of XML for you, and this is all customizable, like you said. I actually wrote, coming out of the Android world, I work a lot with Moshi, which comes out of Square and it's sort of the evolution of GSON for JSON serialization. So I actually wrote my own Moshi converter, which is a content negotiation converter that can just plug in and uses Moshi to serialize and deserialize.
		If you were to use the GSON converter, then that would use GSON behind the scenes, and there are also some for different JSON serialization mechanisms, you can make them for XML. They'll really use whatever library is behind the scenes you choose.

19:12	Hadi:	Out of the box, if I want to use Ktor, what is there available, and what would I have to write myself? Because I mean, if you look at some of the other frameworks such as, again, Spring Boot, not to focus on Spring Boot, right? But it's the one that I know most, I'm sure that there are other frameworks. I think there's one called Ratpack, and a bunch of other ones, that have been around—

19:35	Ryan Harter:	Yeah.

19:35	Hadi:	—for a while, and you would expect that they have a whole bunch of functionality. Where is Ktor in comparison to these?

19:42	Ryan Harter:	I guess I can't give it a one-to-one comparison as far as actual numbers. But to give you an idea in usage, you know, I mentioned that I made the Moshi converter for the content negotiation feature, and that was in large part to learn how to make custom features and that sort of thing, and also because I was really familiar with that. But out of the box, Ktor comes with enough features that, in my opinion, most apps, most web apps would be able to just use out-of-the-box features.
		To give you an idea for… Authentication is a feature, and out of the box, there are five different types of authentication, including basic and form authentication, LDAP, OAuth, all that kind of stuff. For content negotiation, if you work with JSON, there are a couple, there's GSON and Jackson. For templating, if you want to do HTML templates, there are four different built-in template engines that are supported.
		So there's really a whole ton of features, and you can find all of those on ktor.io. Really great documentation up there, where they list all of the features.

20:58	Hadi:	Right. So, would it be fair to say that, generally, if someone wants to write their server-side application, they've got enough functionality now in Ktor that they wouldn't really need to write anything custom? If you… I mean it's hard to judge, but you know what I'm saying, right?

21:16	Ryan Harter:	Yeah. Yeah, I would say, in my estimation, absolutely. Unless you're interacting with some sort of custom off service or something like that, or, you know, like I did with Moshi. Unless you've got some library you really like that is a little less well known, and want to use it, there's really nothing that you need to do.

21:37	Hadi:	How do you deploy a server-side application? Is it a jar, is it a war? How is it deployed, or what are the options that it offers you?

21:45	Ryan Harter:	That's a great question. So Ktor actually comes with a whole bunch of different built-in engines that allow you to run, to actually deploy and run Ktor applications in many different environments. So you can actually build Ktor just as a fat jar so that all you have to do is run it using Java on your server. You can run it as a servlet, in a servlet container, it'll build a war for you, and you can also run it directly from Docker.
		It's got a whole bunch of these different containers, or engines, that you can run it with. And then what's really nice about that is actually for development, you can use a local development engine, something like Jetty or Netty. So that way you get things like hot deploy and that sort of stuff to make the development life cycle a lot faster and easier.

22:42	Hadi:	Right, and the application actually can be, I mean, it does use Netty, right? If you want to use Netty as the engine underneath, right?

22:49	Ryan Harter:	Absolutely, yeah.

22:51	Hadi:	That's cool. And how hard do you think it is for people to get up and running with Ktor?

22:58	Ryan Harter:	In my experience, I found it super quick, you know. In five minutes you can get up and running. Again at ktor.io, they've got some great documentation. And there's actually, because Ktor comes from JetBrains, the people behind some wonderful IDEs, they've actually got a plugin for their IDEA-based IDEs. You can start a project as a Ktor project, and you can pick all of the features you want, and tell it what type of engine it's going to run on, and it'll set up a project for you to make it super-quick. And then you can just go modify that project if you want to get started quickly and try it out.

23:40	Hadi:	Nice, and of course this can be deployed to anything, right? I mean, you can deploy to Google Cloud, to Amazon, to Heroku, anywhere, right?

23:48	Ryan Harter:	Yeah, it really runs anywhere that'll, you know, run a web server. I actually started out running in Google App Engine for the projects that I've been using, and I recently switched over to Google Container Engine. So I run my Ktor apps and Docker, and they're managed by Kubernetes in Google Cloud, so it takes care of auto-scaling, and all that sort of stuff for you, so it's really flexible. And I was able to do that with minimal changes to my actual web application code.

24:22:00	Hadi:	Yeah. Man, I tell you, every time I stop looking at a control panel for Cloud, some new thing appears... and I learn that new thing. (laughs)

24:31:00	Ryan Harter:	Yeah. (laughs)

24:34:00	Hadi:	And so we've ended up in a world where it's kind of ironic that our cloud providers are trying to make deployment as simple as possible, and they've come up with so many products, features, terminology that it now takes you a longer time to understand and learn all that than in the old days. It's just like, "Oh, here's a jar, throw it on a metal box over there, and pipe it up to the Internet."

25:02:00	Ryan Harter:	(laughs)

25:02:00	Hadi:	(laughs)

25:03:00	Ryan Harter:	Yeah, but boy I tell you, when I want to deploy something new, I always try to find whoever makes that easiest, and whoever will take care of things like scaling and that sort of stuff for me, so I don't ever have to think about it.

25:15:00	Hadi:	Yeah. So, we've been talking quite a bit about the server-side stuff, but of course at the beginning you also mentioned that Ktor is not just a server-side library, or framework, it is also client-side, right?

25:28:00	Ryan Harter:	Yeah, yeah.

25:29:00	Hadi:	So what does that mean? I mean, what is it offering me in terms of clients?

25:33:00	Ryan Harter:	So, Ktor on the client offers a few different things. What I would say is probably the biggest piece of it is the HTTP client. Basically, what Ktor will do is it acts as an adapter for different engines, so that could be OKHttp on JVM and Android, or the Apache HTTP engine, different things like that. And well, I suppose, as long as I'm mentioning Java HTTP engines, this also works on iOS, and it also works on JavaScript.
		So we've got all these different engines that Ktor sits on top of, and what it gives you is some really similar functionality to the server side, in that it allows you to use features.

27:07:00	Hadi:	So why would I... Let's say I'm a big user of OkHttp. What do I gain if I'm targeting the JVM using the Ktor HTTP client, if this is sitting on top of OkHttp?

27:27:00	Ryan Harter:	That's a good question, and if you're only targeting the JVM, I'm not sure that you would. I think we're—

27:41:00	Hadi:	I mean, probably it adds some kind of idiomatic APIs that—

27:46:00	Ryan Harter:	Yeah.

27:46:00	Hadi:	—like a little bit more of a facade kind of thing, right?

27:51:00	Ryan Harter:	Yeah.

27:51:00	Hadi:	OK.

27:51:00	Ryan Harter:	And I think, you know, as far as I understand it, that's largely the difference. I think the main selling point is multi-platform.

28:01:00	Hadi:	Right.

28:02:00	Ryan Harter:	Yeah.

28:02:00	Hadi:	Meaning that tomorrow, if I want to create an application that targets Native and JVM, if I use Ktor’s HTTP client, I could potentially do that, with the caveat that, of course… Because this is where we need to... If I'm targeting the JVM, if I'm using as an engine OkHttp, if I'm targeting Native, I would have to use a different engine there, right?

28:37:00	Ryan Harter:	Yeah.

28:38:00	Hadi:	But the API, the surrounding API, the one that I'm using in my code, would basically remain the same, right? So it's essentially only the initialization, so to speak, would vary, is that correct?
28:52:00	Ryan Harter:	Yep, that's it. So you would create the HTTP client differently, but outside of that, how you consume it, how you use it, is identical.

29:02:00	Hadi:	OK, that makes sense. And it also, I guess, minimizes the amount of code that is different. You just create the different ones for the different platforms, which you could do with the “actual” and “expect” constructs with this and Kotlin.

29:18:00	Ryan Harter:	Exactly. Yep.

29:20:00	Hadi:	Cool.

29:21:00	Ryan Harter:	And the KotlinConf app is actually a great open source example of this. It's a multi-platform app that uses Ktor client for its web requests.

29:32:00	Hadi:	OK, so that's something that people can actually look at to see how it is using, I'm guessing it's using Apache, or OkHttp on the JVM, sorry, the Android app, and then it's using something Native to iOS for the iOS version, right?

29:49:00	Ryan Harter:	Yeah, it's just a Ktor iOS engine.

29:53:00	Hadi:	Cool. And the great thing is that this is now also available for different native platforms, right? So I'm guessing that if I want to do some HTTP calls targeting Mac OS, I could do that as well. So do you generally recommend people to use Ktor, I mean do you think it's ready for production? I mean you've got it in production I guess, right?

30:16:00	Ryan Harter:	Yeah, I do. I've been using it, I think... when I started using it, which was probably a year, year-and-a-half ago, it was pretty early and a lot of things were changing really fast. But it's grown up, it’s past its 1.0 and the team's been doing a really good job, they communicate really well, they're really active in the Slack Channel. And I’ve found that it's certainly stable and ready for production, and like you said, I've been using it in production, honestly, since shortly before it hit 1.0. Yeah, absolutely, I think it's definitely ready.

30:57:00	Hadi:	But you've done stuff in JavaScript, right?

31:01:00	Ryan Harter:	I have.

31:01:00	Hadi:	Yeah, I saw. You know, it's not like for you to say to me I've been using it before 1.0. Сome on, man. In JavaScript we 
used to release things on zero: "Oh look, there's a new framework, oh look, it's been out a day, oh, let’s deploy to production." Like, sure, it's a 0.007.988, it's fine, it's OK.

31:19:00	Ryan Harter:	(laughs) That is fair, yeah.

31:20:00	Hadi:	It is, right? And it's funny how in the JVM world, we're kind of reluctant to... "Oh, no, no, no, until that thing doesn't hit 1.0 I am not touching it." (laughs)

31:30:00	Ryan Harter:	Yeah.

31:31:00	Hadi:	It's crazy, anyway...

31:33:00	Ryan Harter:	And I think that actually makes sense with Ktor in particular, but also other JetBrains libraries, just because they do, you know... JetBrains isn't afraid to change APIs before they hit 1.0. And things change, and you certainly have to update and move with it.

31:51:00	Hadi:	Is that a polite way of saying that JetBrains doesn't give a crap about breaking changes? (laughs)

31:57:00	Ryan Harter:	(laughs) You know, pre 1.0, I appreciate that.

31:59:00	Hadi:	Yeah. Post 1.0, we don't, right?

32:03:00	Ryan Harter:	Yeah. (laughs)

32:04:00	Hadi:	I mean, you know, they are, it's no secret that for example for the SDK for IntelliJ... I mean, I don't know how it is 
now with IntelliJ, so I'm not gonna comment. But with ReSharper, I remember that there was a period of time we used to say, "Why aren't you building any plugins on ReSharper?" And people were like, "Because you break it every time." I'm like, "OK, fair point, we'll stop doing that." You know?

32:27:00	Ryan Harter:	(laughs) Yeah.

32:30:00	Hadi:	Cool. So, what's next for you then?

32:34:00	Ryan Harter:	I've actually been working on trying to make my… My Ktor application I mentioned runs on Google container engine, using Docker. It plugs into a whole lot of Google Cloud and Firebase features, like the Firestore and that kind of stuff. And what I've been working on is actually trying to make that pluggable from a configuration standpoint.
		So what I'd like to do is have a Ktor application that, you know… Right now everything, you know, setting up Cloud Firestore and all that kind of stuff is configurable, you know, via configuration. But I want to actually make one binary that people can run, and – whether they're gonna run on a SQL database for storage, or Firestore, or MongoDB, or anything like that – they should have one binary that they can deploy with a different configuration file, and it will connect whatever they want.
		So I've sort of been exploring how to mix Ktor with dynamic initialization, to make that work, which has really been a lot of fun.

33:45:00	Hadi:	And what approach are you taking there? Basically, are you trying to create configuration files in JSON, or YAML, or whatever, or are you...?

33:56:00	Ryan Harter:	Largely, because of the way that server files are packaged and stuff, you create a war and it's just a single package, so it makes things hard to configure inside there. My main approach has been using the environment to configure things, so if you're standing something up on container engine, you can pass in different environment variables to adjust how it's going to run. The same thing for Heroku, or any other platform that you want it to run on.

34:32:00	Hadi:	Yeah, back in the old days… I don't know how far back you go with web development, but back when I started this, we used to have this thing called ISAPI DLLs, it was around the same time as, or a little bit, after CGIs. So we didn't have anything sophisticated like containers, or anything like that, right?

34:54:00	Ryan Harter:	Yeah.

34:55:00	Hadi:	So we used to do this same kind of concept... I would just create a single binary that I wouldn't ever have to modify, and then basically these massive INI files. Do you remember the INI file from Windows, which was basically name=value?

35:11:00	Ryan Harter:	Yeah.

35:12:00	Hadi:	Setting absolutely everything, from database pass, to the customers, company name, to everything you could think of.

35:12:00	Ryan Harter:	Yeah.

35:20:00	Hadi:	But it made it really cool, right? Because basically you would just dump that DLL along with the INI file, and you would 
hit Run, and then that's when you would realize that, "Oh, DLLs aren't allowed to read from the local file system."

35:35:00	Ryan Harter:	(laughs)

35:35:00	Hadi:	(laughs) And then it was like, "OK, that's back to the drawing board."

35:38:00	Ryan Harter:	Yeah.

35:38:00	Hadi:	Trying to figure this out... “It was working on my machine in development, Jesus!” (laughs)

35:44:00	Ryan Harter:	(laughs) Yeah.

35:44:00	Hadi:	Anyway.

35:44:00	Ryan Harter:	And that's sort of a similar end result that I'm looking for. Since before KotlinConf, I've been working on this subscription management system, specifically for Android apps, but mobile apps in general, it'll work with iOS. And to verify purchases, and then manage subscription lifecycle, if a user is subscribed to your app… I make a coloring book app. Users subscribe to get access to all the new content, and features...

36:10:00	Hadi:	Is that for kids?

36:11:00	Ryan Harter:	Nope, it's actually targeted for adults.

36:13:00	Hadi:	Really?

36:14:00	Ryan Harter:	Yep, it's an adult coloring book app, and it's sort of a meditative experience for a lot of people, you know, 
stress relief type of thing.

36:24:00	Hadi:	Oh, you should send me a link, I should check that out.

36:27:00	Ryan Harter:	Yeah, I'd be happy to. So this service that I'm making is... What I'm hoping to do is actually release it open source. And what I'd love to get to is a point where there can be a one-click setup, so somebody else is making an app, maybe an indie developer or something that has subscription services, and I want them to be able to go to the README. You know, with Heroku you can click a button and it'll set things up for you. So that you can deploy those and configure it however you need with very little changes, and then just plug it into your app and go.

37:03:00	Hadi:	So, excuse my ignorance here, but doesn't the Google Play store offer any kind of support for subscription-model apps?

37:15:00	Ryan Harter:	The Play Store in particular provides… They take care of things like taking the money and cancellation and that sort of stuff, but there's a lot of stuff that's not available in the app. For instance, in the Android app I can't query the Play Store, Google Play, on the device, and have it give me an expiration date to a subscription, which seems like the first thing you would want. So basically, what the higher-ups like Google Play say is, well, they have a payment platform and it's your job to make the platform for actually like managing, and subscriptions, and that sort of stuff on top of it. Which I consider to be a big limitation of the platform, but that leaves an opening for this project here.
		And so the way that it works is what you're supposed to do, when a user makes a purchase on the device, they get a token back, and you're supposed to send that token to your own server. Which behind the scenes reaches out to the Play Store APIs to verify the token and get all of this extra information about it, like an expiration date, how long the trial period lasts, and all that kind of stuff that you can't get on device. So what I'm building is basically that server component.

38:42:00	Hadi:	OK, that makes sense.

38:44:00	Ryan Harter:	Yeah.

38:44:00	Hadi:	And it feels like a niche as you say, well, not a niche, but a gap that needs filling, right?

38:48:00	Ryan Harter:	Yeah, you know, there have been a lot of libraries that give you the tools to do that, and the verification thing is on all of the platforms. Even on iOS they, you know... Ideally you would verify the tokens on your own server because you know the client, the device that the user's using could be compromised, it could be jailbroken or whatever. So that's an environment you control, where you can take care of verification, so this system plugs into the Play Store, and the Apple App Store, and would also work with other stores like Unity or Amazon.

39:22:00	Hadi:	And so your idea here is… As opposed to you hosting this for every application developer out there, and providing this as a service, what you want is basically to create these self-contained applications that anybody could deploy on any container to serve their specific application with zero configuration, essentially, right?

39:43:00	Ryan Harter:	Yeah, that's the hope.

39:44:00	Hadi:	Nice.

39:46:00	Ryan Harter:	Yeah, and that just plays into, you know, I'm an app developer, I don't want to be a hosting provider. (laughs)

39:51:00	Hadi:	Yeah. Cool, well it was great chatting with you, thanks for coming on, and hope to meet or chat again at some point!

39:59:00	Ryan Harter:	Yeah, thanks so much for having me, I appreciate it.
