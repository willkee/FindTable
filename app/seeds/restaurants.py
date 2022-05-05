from app.models import db, Restaurant, Setting, Cuisine
from random import randint
# Adds restaurants seed data

restaurant_list = [
	{
		'owner_id': 17,
		'name': "Barney Greengrass",
		'price_rating': 3,
		'img_url':
			"https://static01.nyt.com/images/2019/10/14/nyregion/14BARNEY/14BARNEY-superJumbo.jpg",
		'phone_number': "2121536713",
		'website': "https://www.barneygreengrass.com/",
		'street_address': "541 amsterdam ave, 10024",
		'borough': "Brooklyn",
		'accessible': False,
		'hours': "5:00PM - 10:00PM",
		'description':
			"The average age of a Barney Greengrass patron probably hovers around 67. The restaurant still keeps monthly tabs for regulars (the New Yorkers David Remnick being one of them). The gold, panoramic wallpaper looks like it could tell you about the turn of the century (the 20th one). And the recipe for the scrambled eggs with Nova lox hasnt changed in decades. The timelessness of this uptown Jewish deli is about three-quarters of the charm. The other quarter is made up of whatever wisecracks your veteran waiter is sure to dole out.",
	},
	{
		'owner_id': 4,
		'name': "Okonomi",
		'price_rating': 3,
		'img_url':
			"https://static01.nyt.com/images/2015/06/10/dining/20150610HUNGRY-slide-DH2U/20150610HUNGRY-slide-DH2U-superJumbo.jpg",
		'phone_number': "2127182351",
		'website': "http://www.okonomibk.com/",
		'street_address': "150 Ainslie St, 11211",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "10:00AM - 9:00PM",
		'description':
			"At this tiny 12-seat spot, there is only one order: chef Yuji Haraguchis simple but spectacular Japanese breakfast set. That spread of miso-and-sake-kasu-slicked fish (like Spanish mackerel or tuna belly), jiggly tamago (omelet), pickles, miso soup, and rice is served on beautiful porcelain worthy of the morning light streaming through the windows.",
	},
	{
		'owner_id': 23,
		'name': "Toms Restaurant",
		'price_rating': 2,
		'img_url':
			"https://www.nycgo.com/images/venues/4689/toms-restaurant-laura-miller__medium.jpg",
		'phone_number': "2129697806",
		'website': "https://www.tomsrestaurant.net/",
		'street_address': "2880 Broadway, 10025",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"Wake up early to avoid the weekend line and youll be rewarded with a sodium bomb of corned beef, bottomless cups of passable coffee, and absurdly crispy diner fries. The fluffiest pancake rumors are true, and the Christmas décor comes down for no season. After all, who can resist that kind of cheer? Bring cash!",
	},
	{
		'owner_id': 25,
		'name': "Sylvias",
		'price_rating': 4,
		'img_url':
			"https://cbsnews3.cbsistatic.com/hub/i/r/2021/01/08/096e8fe4-0056-4a02-b2d9-987d7e55c5ac/thumbnail/1200x630/6f9c6d0d2a0807a8d66f265e80fa8412/gettyimages-526191458.jpg",
		'phone_number': "2127259124",
		'website': "https://sylviasrestaurant.com/",
		'street_address': "328 Malcolm X Blvd, 10027",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "10:00AM - 9:00PM",
		'description':
			"More than 50 years after it opened, this Harlem institution is hallowed ground. Sure, there are gospel singers and crowds that make getting a table for (post-church) Sunday brunch a challenge, but the most intensely religious experience is the soul food itself. Good things come to those who wait.",
	},
	{
		'owner_id': 15,
		'name': "Buvette",
		'price_rating': 4,
		'img_url':
			"https://images.squarespace-cdn.com/content/v1/57d5ccab03596e4e5bef4adb/1525300781479-LNUBXFCC2BOOU6LZFC7H/5978826628_7e30d9cf70_o.jpg?format=2500w",
		'phone_number': "2128623701",
		'website': "https://ilovebuvette.com/",
		'street_address': "42 Grove St, 10014",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"This place is so cramped even the sidewalk outside the front door is crowded. But inside the perfectly worn room, no one cares, because the scrambled eggs coming out of Jody Williams kitchen are truly the softest, fluffiest, most buttery eggs in New York. Show up early (read: 7 a.m.—especially on weekends) and grab a seat at the white marble bar, right next to the towers of juice and scones, for a full view of said eggs being cooked using the steam wand on the espresso machine.",
	},
	{
		'owner_id': 3,
		'name': "Kopitiam",
		'price_rating': 4,
		'img_url':
			"https://cdn.vox-cdn.com/thumbor/Hzk3WR6W1FIOG1VylydDvQOqR3Y=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/11604459/Kopitiam_167688.jpg",
		'phone_number': "2127378739",
		'website': "https://www.kopitiamnyc.com/menu",
		'street_address': "151 E Broadway, 10002",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"The Lower East Sides coolest breakfast spot is a casual coffeehouse serving intensely flavorful Chinese-influenced Malaysian dishes known as Nyonya cuisine, loaded with anchovies, shrimp paste, and fish sauce. Tables turn quickly in the always-bustling space, so if you show up to a full house, just wait a minute for a seat to open up. Order as many plates and bowls as will fit on your table: Dishes are on the smaller side, easy to share, and guaranteed to be devoured.",
	},
	{
		'owner_id': 24,
		'name': "Neils Coffee Shop",
		'price_rating': 3,
		'img_url':
			"http://1.bp.blogspot.com/-3TSLh7gNlBA/Ty55hb-j1yI/AAAAAAAAPac/iitVUF4zOf4/s1600/P1050615.JPG",
		'phone_number': "2122042628",
		'website': "https://www.yelp.com/biz/neils-coffee-shop-new-york",
		'street_address': "961 Lexington Ave, 10021",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "8:00AM - 2:00PM",
		'description':
			"The red neon “coffee shop” sign, hanging on the corner of 70th and Lexington, is a beautiful lie. Theres no fancy espresso machine in sight here—just a diner with a massive menu of breakfast classics. The same exact waitstaff has been here for decades, serving neighborhood locals, kids fresh off Central Parks Little League fields, construction workers, and confused French tourists. If New York were a restaurant, it would be Neils.",
	},
	{
		'owner_id': 14,
		'name': "Pacificana",
		'price_rating': 1,
		'img_url':
			"http://1.bp.blogspot.com/-vyubEeK4Tgk/UlltLxwMwXI/AAAAAAAAPVI/hzg4VStpZqM/s1600/P1070498.jpg",
		'phone_number': "2122292114",
		'website': "https://pacificanatogo.com/",
		'street_address': "813 55th St, 11220",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "8:00AM - 2:00PM",
		'description':
			"This large ballroom looks like it came straight out of Beauty and the Beast (ceiling moldings, chandeliers, gold accents) and is sacred ground for dim sum lovers. But its also a lesson in strategy: When a cart comes by with the best stuff—shu mai, har cheung (rice noodle rolls), dan tat (egg tarts)—dont hesitate for a moment. Eyes on the prize!",
	},
	{
		'owner_id': 4,
		'name': "Atla",
		'price_rating': 3,
		'img_url':
			"https://infatuation.imgix.net/media/images/reviews/atla/banners/1580770010.79.jpg",
		'phone_number': "2126353707",
		'website': "https://www.atlanyc.com/",
		'street_address': "372 Lafayette St, 10012",
		'borough': "Manhattan",
		'accessible': False,
		'hours': "10:00AM - 9:00PM",
		'description':
			"The best kind of brunch menu is one that reads like a lunch menu. And that's exactly why Enrique Olvera and Daniela Soto-Innes Mexican spot Atla is the only answer to the dreaded “Where should we do brunch?” text. The narrow, light-filled room is miraculously devoid of loud groups looking to get their bottomless mimosa fix—a rare find in the syrup-drenched, two-hour-wait brunch landscape of lower Manhattan.",
	},
	{
		'owner_id': 8,
		'name': "Balthazar",
		'price_rating': 2,
		'img_url':
			"https://pyxis.nymag.com/v1/imgs/891/fa1/1b40f21c795643ce913f447356a67ecc95-balthazar-01.jpg",
		'phone_number': "2128985075",
		'website': "https://balthazarny.com/",
		'street_address': "80 Spring St, 10012",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "10:00AM - 9:00PM",
		'description':
			"Everyone has been to Balthazar. And everyone still goes to Balthazar. Locals. Tourists. Chefs. Downtown cool kids. Uptown grandparents. After 20-plus years, the classic French brasserie remains a New York institution thanks to its consistency and efficiency. Spend just as much time looking around the timeless room as you do admiring the precision of your omelets roll.",
	},
	{
		'owner_id': 3,
		'name': "Factory Tamal",
		'price_rating': 4,
		'img_url':
			"https://static01.nyt.com/images/2017/08/23/dining/23HUNGRY-TAMAL-slide-31VI/23HUNGRY-TAMAL-slide-31VI-jumbo.jpg",
		'phone_number': "2128972334",
		'website': "https://www.factorytamal.com/",
		'street_address': "34 Ludlow St, 10002",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "8:00AM - 2:00PM",
		'description':
			"If youre the type of person who is comfortable standing on the sidewalk, face down in a brown paper bag of steaming, saucy tamales the morning after an ambitious evening out on the town, youve come to the right place. If youd prefer to be sitting—out of sight from passersby—Factory Tamal has some seats inside too. Either way, this should be your first move, after the Advil of course.",
	},
	{
		'owner_id': 5,
		'name': "Golden Diner",
		'price_rating': 3,
		'img_url':
			"https://pyxis.nymag.com/v1/imgs/85b/0e4/a33b482ebf609e34b71d94b599f914bf1a-22-golden-diner.rsocial.w1200.jpg",
		'phone_number': "2126904118",
		'website': "https://www.goldendinerny.com/",
		'street_address': "123 Madison St, 10002",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"Theres nowhere wed rather disobey traditional meal times than at Golden Diner. A super crispy chicken katsu club first thing in the morning? Honey butter pancakes with honey maple butter at 3:30 in the afternoon? YOU CAN DO IT. The menu has something for everyone, without being intimidatingly long, and is served seven days from 10 a.m. to 5 p.m. All that means we love it here for lunch, and for breakfast and dinner, too—no matter what time of the day youre having it.",
	},
	{
		'owner_id': 13,
		'name': "Pakistan Tea House",
		'price_rating': 2,
		'img_url':
			"https://cdn.vox-cdn.com/thumbor/RYtXBQwWxra7bb6gzzr04WIiElc=/117x0:1932x1361/1400x1400/filters:focal(117x0:1932x1361):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/49984753/pakistanteaExterior.0.0.jpg",
		'phone_number': "2121589995",
		'website': "https://www.yelp.com/biz/pakistan-tea-house-new-york",
		'street_address': "176 Church St, 10013",
		'borough': "Queens",
		'accessible': False,
		'hours': "5:00PM - 10:00PM",
		'description':
			"This place is small. The tables are few. And the beverage list consists of canned soda and bottled water. And thats all perfect, because Pakistan Tea House isnt a place for glitz and glamour. Its the spot for ripping hot naan, quick service, and consistently excellent, absurdly flavorful steam table Indo-Pakistani food. Even better? Its open 24 hours a day, making it popular with Tribeca office workers in the afternoon and hungry cabbies in the early morning hours. Unless we have one of those kinds of nights, were usually there for an Ive got a meeting in 30 minutes, but need a real lunch lunch.",
	},
	{
		'owner_id': 19,
		'name': "Arepa Lady",
		'price_rating': 3,
		'img_url':
			"https://pyxis.nymag.com/v1/imgs/77c/854/4ebade258c3a78864f6eeb7d35ab5a8626-arepa-lady-01.rsocial.w1200.jpg",
		'phone_number': "2123614584",
		'website': "https://www.yelp.com/biz/arepa-lady-jackson-heights-4",
		'street_address': "77-17 37th Ave, 11372",
		'borough': "Manhattan",
		'accessible': False,
		'hours': "10:00AM - 9:00PM",
		'description':
			"It didnt take long for New Yorkers to fall in love with Maria Cano, a.k.a. the “Arepa Lady,” when she first launched her food cart in Queens in the 1980s. And while the business has grown over the years, with Maria and her sons moving their operation into new brick-and-mortar spaces (including a stand at Brooklyns DeKalb Market), not too much has changed. You can still find the same deeply satisfying corn cakes stuffed with cheeses and meats that built their reputation in the first place. Its just that with all this added elbow room, its even easier to stroll in for lunch with say, seven of your closest friends and get seated (read: start eating) right away.",
	},
	{
		'owner_id': 2,
		'name': "La Esquina Del Camarón Mexicano",
		'price_rating': 2,
		'img_url':
			"https://static01.nyt.com/images/2017/05/10/dining/10HUNGRY-LA-ESQUINA-slide-BSJA/10HUNGRY-LA-ESQUINA-slide-BSJA-jumbo.jpg",
		'phone_number': "2127236066",
		'website':
			"https://www.yelp.com/biz/la-esquina-del-camaron-mexicano-jackson-heights",
		'street_address': "80-02 Roosevelt Ave, 11372",
		'borough': "The Bronx",
		'accessible': True,
		'hours': "10:00AM - 9:00PM",
		'description':
			"Those searching for New Yorks tastiest seafood tostadas know not to look for the storefront by name. Thats because La Esquina takes up just a small sliver of Roosevelt Deli, with just six seats and a menu of empanadas, tostadas, tacos, and other fish and seafood specialties. Bring cash, an appetite, and just one lucky friend—space is tight and those few seats sought after. But if you cant get a spot while you crunch on shatteringly crisp tortillas, dont sweat it. These tostadas taste just as good eaten on the sidewalk.",
	},
	{
		'owner_id': 7,
		'name': "Zooba",
		'price_rating': 3,
		'img_url':
			"https://media-cdn.tripadvisor.com/media/photo-s/1a/ca/5f/09/we-re-usually-a-little.jpg",
		'phone_number': "2121646312",
		'website': "https://www.zoobaeats.com/usa-homepage/",
		'street_address': "100 Kenmare St, 10012",
		'borough': "Manhattan",
		'accessible': False,
		'hours': "8:00AM - 2:00PM",
		'description':
			"Youll fall in love with Zooba before you even taste the food, thanks to all the delightful details—graphic murals, wheatpaste-style posters, colorful LED patterns on the ceiling—inspired by the streets of Cairo. But this fast-casual spot serving Egyptian street-food classics is more than a feast for the eyes. The taameya (freshly fried balls of mashed fava beans), hawashi (a tender meat-veg patty stuffed in fluffy baladi bread), and dips come in a variety of flavors and options, including easy-to-tote salads and sandwiches. Though, with this much to look at, you might choose to grab a seat and stick around.",
	},
	{
		'owner_id': 20,
		'name': "Louie & Ernies",
		'price_rating': 2,
		'img_url':
			"https://cdn.vox-cdn.com/thumbor/09JJhuU0msyKJUt1jBWDCGn9jt8=/0x0:2048x1360/1200x800/filters:focal(867x592:1193x918)/cdn.vox-cdn.com/uploads/chorus_image/image/67424116/image__3_.0.png",
		'phone_number': "2129488683",
		'website': "https://louieanderniespizza.com/",
		'street_address': "1300 Crosby Ave, 10461",
		'borough': "Manhattan",
		'accessible': False,
		'hours': "8:00AM - 2:00PM",
		'description':
			"Louie & Ernies is a residential kind of joint. The neighborhood feels suburban; the building looks like a house. And walking down into the semi-subterranean room is a lot like dropping by your uncles place for lunch—if your uncle also happened to serve some of the best New York–style pizza in the city. Grab a couple of slices, some garlic knots, and head to the back patio where the cozy, relaxed vibes stay strong.",
	},
	{
		'owner_id': 7,
		'name': "Raku",
		'price_rating': 3,
		'img_url':
			"https://media.cntraveler.com/photos/5d238a110821680008fdfd0e/16:9/w_2560%2Cc_limit/01-NYC-2019-Raku-by-Ben-Hon-@stuffbeneats_09.jpg",
		'phone_number': "2127453961",
		'website': "https://rakunyc.com/",
		'street_address': "48 MacDougal St, 10012",
		'borough': "Brooklyn",
		'accessible': False,
		'hours': "5:00PM - 10:00PM",
		'description':
			"Sometimes in this eight-million-person city, you just need some peace, quiet, and udon. Thats when you head to this subdued, intimate noodle shop, where theres jazz on the speakers and beautiful ceramic bowls of thick, chewy, satisfying udon imported from Japan.",
	},
	{
		'owner_id': 12,
		'name': "Court Street Grocers",
		'price_rating': 3,
		'img_url':
			"https://media-cdn.tripadvisor.com/media/photo-s/09/d7/a0/5d/court-street-grocers.jpg",
		'phone_number': "2124164170",
		'website': "http://www.courtstreetgrocers.com/",
		'street_address': "540 LaGuardia Pl, 10012",
		'borough': "Queens",
		'accessible': True,
		'hours': "8:00AM - 2:00PM",
		'description':
			"The menu might seem intimidating at first—there are a lot of sandwiches—but once you make your way through the list, youll realize each item has earned its place. Whether its eggy, vegetarian, toasty, or cold cuts-y, Court Street nails it.",
	},
	{
		'owner_id': 24,
		'name': "Hometown Bar-B-Que",
		'price_rating': 1,
		'img_url':
			"https://images.squarespace-cdn.com/content/v1/55bfb06ce4b0df65afe0dcd8/1464291987968-WMRX2M2HMFQFJ272LTQH/HometownBBQ-287.jpg?format=2500w",
		'phone_number': "2128291500",
		'website': "https://hometownbbq.com/",
		'street_address': "454 Van Brunt St, 11231",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "8:00AM - 2:00PM",
		'description':
			"The brisket is just as good as what youd find in Texass top barbecue joints, the beef rib is truly a spectacle to behold, and the sides are legitimately great. Lines are long, and theres a reason for that. Listen to the live music on weekend nights and wait it out.",
	},
	{
		'owner_id': 1,
		'name': "Tian Jin Dumpling House",
		'price_rating': 1,
		'img_url':
			"https://www.seriouseats.com/thmb/YIyPfUzynJFV77CCGP85uJwfGZc=/610x458/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__newyork.seriouseats.com__images__2013__06__20130625-tianjin-dumpling-9-7da0cde6a9fe424db9d6c42e98afb88c.jpg",
		'phone_number': "2127499467",
		'website':
			"https://www.yelp.com/biz/tian-jin-dumpling-house-%E5%A4%A9%E6%B4%A5%E5%8C%85%E5%AD%90-flushing",
		'street_address': "41 Kissena Blvd, 11354",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "8:00AM - 2:00PM",
		'description':
			"The only less-than-wonderful part of Tian Jin is finding it for the first time. The compact dumpling spot is buried in the basement food court of the Golden Shopping Mall. But once you descend into the space, the thick-skinned steamed dumplings are all youll be thinking about. The dumplings are chewy and soft, and the meats and vegetables wrapped inside are seasoned aggressively. Sit at the counter and make use of the chili oil.",
	},
	{
		'owner_id': 13,
		'name': "Los Tacos No. 1",
		'price_rating': 3,
		'img_url':
			"https://cdn.vox-cdn.com/thumbor/YMma3zMepL7Uw04URLnFJoAfwJI=/0x0:1080x809/1200x800/filters:focal(454x319:626x491)/cdn.vox-cdn.com/uploads/chorus_image/image/55808893/19623547_863210783830876_2160383011042885632_n.0.jpg",
		'phone_number': "2128027572",
		'website': "https://www.lostacos1.com/",
		'street_address': "75 9th Ave, 10011",
		'borough': "Manhattan",
		'accessible': False,
		'hours': "10:00AM - 9:00PM",
		'description':
			"If youre in Chelsea Market and not having a crowd/stroller/lost tourists–induced panic attack, chances are you just ate at Los Tacos No. 1, where the tacos taste as good as the braised and roast meats smell. Plus, it comes on some of the best flour tortillas in the city, which can also be found at its sister restaurant Los Mariscos, just down the hall.",
	},
	{
		'owner_id': 1,
		'name': "Teranga",
		'price_rating': 2,
		'img_url':
			"https://cdn.vox-cdn.com/thumbor/20d5SmG7UA2ljEQvZGhOw1ChEOE=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13728729/NyMjiNpv.jpg",
		'phone_number': "2128658272",
		'website': "https://itsteranga.com/",
		'street_address': "1280 5th Ave, 10029",
		'borough': "Staten Island",
		'accessible': True,
		'hours': "10:00AM - 9:00PM",
		'description':
			"Who serves New Yorks best jollof, a pot of deep red grains cooked with caramelized tomato paste and crowned with diced onions, carrots, and peas? Thats a heated question. But chef Pierre Thiams airy all-day café Teranga in Harlem is a top contender. The build-your-own format of the fast-casual spot leaves the construction of a bowl of West African dishes up to you, and youll wish you had seconds before youve even finished whats on your tray. Just make sure you dont get too far without employing the four condiments set out on the table—theyre not to be missed.",
	},
	{
		'owner_id': 10,
		'name': "Via Carota",
		'price_rating': 1,
		'img_url':
			"https://static01.nyt.com/images/2015/03/04/dining/20150304REST-slide-DV7R/20150304REST-slide-DV7R-superJumbo.jpg",
		'phone_number': "2121759955",
		'website': "https://www.viacarota.com/",
		'street_address': "51 Grove St, 10014",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "10:00AM - 9:00PM",
		'description':
			"Its not that Via Carota isnt a dream dinner place. Its just that we prefer to head in around noon for lunch, when a long daytime meal in Jody Williams and Rita Sodis stylish dining room makes us feel like were some West Village celebrity, Italian movie star, or power-lunching media mogul. Oh, and the wait—which can stretch up to three hours in the evening—is much more reasonable this time of day. Like Williams and Sodis other restaurants in the neighborhood (I Sodi, Buvette, and the new Bar Pisellino), its worth holding out for.",
	},
	{
		'owner_id': 11,
		'name': "New Asha",
		'price_rating': 3,
		'img_url':
			"https://media-cdn.tripadvisor.com/media/photo-s/02/62/30/cb/string-hoppers-shrimp.jpg",
		'phone_number': "2124691620",
		'website':
			"https://www.yelp.com/biz/new-asha-sri-lanka-restaurant-staten-island",
		'street_address': "322 Victory Blvd, 10301",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"If you want to eat Sri Lankan food in New York City, you go to Staten Island. And if thats your agenda, you should head to New Asha, a small, humble restaurant serving deeply flavorful curries, hand pies, and kottu roti (a stir-fried dish made with torn, flaky flatbread). Keep in mind that each bracingly fiery, pickle-y, sour-y dish comes piled high on Styrofoam plates, making a nap on the ferry home an inevitable (and welcome) ending to the feast.",
	},
	{
		'owner_id': 16,
		'name': "Cho Dang Gol",
		'price_rating': 2,
		'img_url':
			"https://images.squarespace-cdn.com/content/v1/53cc1616e4b0f4361f8ace24/1451341116085-1L15LMY3XR51F4OO4CLN/image-asset.jpeg",
		'phone_number': "2121315470",
		'website': "https://chodanggolnyc.com/",
		'street_address': "55 W 35th St, 10001",
		'borough': "Manhattan",
		'accessible': False,
		'hours': "8:00AM - 2:00PM",
		'description':
			"They say you should be able to judge a Korean restaurant by its banchan, the welcome wave of small, highly seasoned, free dishes that arrive at the start of a meal to stoke your appetite. And at this homey, low-key spot a few blocks north of the main K-Town stretch on 32nd Street, all signs point to top marks. A small bowl of delicate house-made tofu curds. Wheels of sticky-sweet braised lotus root. Zucchini rounds battered in egg. Cucumber-seaweed salad. And more. All before youve even had a moment to look at the stews.",
	},
	{
		'owner_id': 1,
		'name': "Santa Ana Deli & Grocery",
		'price_rating': 2,
		'img_url':
			"https://images.bushwickdaily.com/spai/w_998+q_lossy+ret_img/http://cdn.bushwickdaily.com/post_image-image/n13IgzYrBfq3tOFxUO32Eg.jpg",
		'phone_number': "2129115682",
		'website': "https://www.yelp.com/biz/santa-ana-deli-and-grocery-brooklyn",
		'street_address': "171 Irving Ave, 11237",
		'borough': "Brooklyn",
		'accessible': False,
		'hours': "5:00PM - 10:00PM",
		'description':
			"Up front, Mexican sodas, snacks, and beers can be grabbed from ramshackle shelves. In the back, a small griddle where meats are sizzled and seared before theyre slapped onto soft flour tortillas and topped with thinly sliced vegetables. Dont forget to ask for red and green salsas with everything you order.",
	},
	{
		'owner_id': 10,
		'name': "Superiority Burger",
		'price_rating': 4,
		'img_url':
			"https://static01.nyt.com/images/2015/09/02/dining/02REST-slide-KN84/02REST-slide-KN84-jumbo.jpg",
		'phone_number': "2124462942",
		'website': "http://www.superiorityburger.com/",
		'street_address': "119 Avenue A, 10009",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "10:00AM - 9:00PM",
		'description':
			"A vegetarian burger joint that meat-eaters love? However unlikely it may sound, its real. (And theres nothing particularly healthy about it—in a good way.) Brooks Headleys veggie burgers are all kinds of flavorful, from the dill pickles to the Muenster cheese to the kind-of-spicy patty. The tiny spot is almost always slammed, so take your haul half a block down 9th Street to a bench in Tompkins Square Park and get in some prime people watching at the same time.",
	},
	{
		'owner_id': 13,
		'name': "Bunna Cafe",
		'price_rating': 2,
		'img_url': "https://bunnaethiopia.net/images/New-Main-front-header.jpg",
		'phone_number': "2124143398",
		'website': "https://bunnaethiopia.net/",
		'street_address': "1084 Flushing Ave, 11237",
		'borough': "Queens",
		'accessible': False,
		'hours': "5:00PM - 10:00PM",
		'description':
			"This bustling, 100-percent plant-based Ethiopian spot is the ultimate answer to the age-old question, “Where are we going to take our vegetarian friends to dinner?” Sixteen bucks gets you a hubcap-size platter loaded with all manner of hearty, stewy, elaborately spiced vegetables and legumes piled atop supple, tangy injera. Its more than enough for four hungry people. Eating with your hands, throwing back a couple of St. George Lagers, youll suddenly have a reason to be grateful for friends with dietary restrictions.",
	},
	{
		'owner_id': 8,
		'name': "Cafe Kashkar",
		'price_rating': 2,
		'img_url':
			"https://www.villagevoice.com/wp-content/uploads/2013/07/8954030.0.jpg",
		'phone_number': "2125009287",
		'website': "https://www.kashkar-cafe.com/",
		'street_address': "1141 Brighton Beach Ave, 11235",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"You love Uzbek-Uyghur food; you might just not know it yet. Chewy-tender hand-pulled noodles piled high with chunks of coriander-and-cumin-seasoned lamb. Flaky disks of pastry stuffed with tender bits of lamb and herbs. Juicy, fist-size steamed dumplings spilling forth with...more lamb. Okay: You may not love Uzbek-Uyghur food if you dislike lamb. But if you do, get thee to Brighton!",
	},
	{
		'owner_id': 18,
		'name': "Ganesh Temple Canteen",
		'price_rating': 2,
		'img_url':
			"https://pyxis.nymag.com/v1/imgs/374/043/0a2dd74f59fe716e1f0c457ceac0c27c20-ganesh-temple-canteen-01.rsocial.w1200.jpg",
		'phone_number': "2126523722",
		'website': "https://canteen.nyganeshtemple.org/",
		'street_address': "09 Holly Ave No 143, 11355",
		'borough': "Manhattan",
		'accessible': False,
		'hours': "8:00AM - 2:00PM",
		'description':
			"You might not have known that some of the greatest dosas in New York City are being served in the basement cafeteria of a Hindu Temple in Queens. Well, folks...now ya know. Enter the main doors and follow the signs pointing you toward the “Temple Canteen”—through the ornate, stone pillar-lined halls and down a flight of stairs—into a large, starkly lit cafeteria filled with folding tables and chairs. There youll find an expansive, all-vegetarian menu of South Indian specialties. Everything on the menu comes in under $7.50 (and with a side of spicy ground coconut chutney and sambar, a brothy lentil gravy) which means you should show up with a group and order liberally.",
	},
	{
		'owner_id': 4,
		'name': "Margon Restaurant",
		'price_rating': 1,
		'img_url':
			"https://margon.has.restaurant/wp-content/uploads/sites/7/2017/03/margon-newyork-17-e1488543610517.jpg",
		'phone_number': "2124615123",
		'website': "https://margon.has.restaurant/",
		'street_address': "136 W 46th St, 10036",
		'borough': "Manhattan",
		'accessible': False,
		'hours': "10:00AM - 9:00PM",
		'description':
			"This narrow spot on 46th Street shines brightly in the food desert known as Times Square. Margon serves Cuban classics from a long line of steam trays to construction workers, 9-to-5ers, tourists, and costumed superheroes alike. The Cuban sandwich is perfectly crispy and nothing close to healthy (as it should be).",
	},
	{
		'owner_id': 18,
		'name': "Casa Adela",
		'price_rating': 2,
		'img_url':
			"https://static01.nyt.com/images/2015/06/28/nyregion/20150628JOINTss-slide-7GKB/20150628JOINTss-slide-7GKB-jumbo.jpg",
		'phone_number': "2128186103",
		'website': "https://www.yelp.com/biz/casa-adela-new-york",
		'street_address': "66 Loisaida Ave, 10009",
		'borough': "Brooklyn",
		'accessible': False,
		'hours': "8:00AM - 2:00PM",
		'description':
			"As any Philly or Chicago transplant can attest, BYOB joints are a rare commodity in NYC. Which is all the more reason why were grateful for Casa Adela. When you sit down on a not-so-comfortable chair and look around at the families passing rotisserie chickens, tostones, and mofongo over glass-covered vinyl tablecloths, youll understand the appeal: This is the place to go for real, honest, comforting Puerto Rican cooking. Discovery Wines and Alphabet City Wine Co. are both conveniently within walking distance, so dont forget to snag a bottle or two on your way.",
	},
	{
		'owner_id': 11,
		'name': "Frenchette",
		'price_rating': 3,
		'img_url':
			"https://cdn.vox-cdn.com/thumbor/7AOrrni6WY2UgpiQ5Wa3eDQA4mc=/0x0:5760x3840/1200x675/filters:focal(2420x1460:3340x2380)/cdn.vox-cdn.com/uploads/chorus_image/image/59353619/Frenchette_14.0.jpg",
		'phone_number': "2121577419",
		'website': "https://www.frenchettenyc.com/",
		'street_address': "241 W Broadway, 10013",
		'borough': "Brooklyn",
		'accessible': False,
		'hours': "8:00AM - 2:00PM",
		'description':
			"Assume the duck frites are happening, and then treat the rest of the menu at this new-school French bistro as a to-do list (boudin blanc, roast chicken for two on a plank of garlic-butter baguette) and get to work. Dive into a hard-to-find bottle of biodynamic wine from one of the best lists in the city. Keep an eye out for celebrities and powerful people. Then play it cool. Tonight, youre one of them.",
	},
	{
		'owner_id': 21,
		'name': "F&F Pizzeria",
		'price_rating': 1,
		'img_url':
			"https://cdn.vox-cdn.com/thumbor/2TfwpMCOwD9BBLB2ben9iWCimSw=/0x0:4032x3024/1200x0/filters:focal(0x0:4032x3024):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/19325819/exterior.jpg",
		'phone_number': "2129946641",
		'website': "https://www.franks.pizza/",
		'street_address': "459 Court St, 11231",
		'borough': "West Village",
		'accessible': False,
		'hours': "10:00AM - 9:00PM",
		'description':
			"In a city filled with slice shops, who needs another, right? Wrong. With dough formulated and fermented by Tartines Chad Roberston, pie technique and construction nailed down by pizza legend Chris Bianco, and a space owned and operated by Carroll Gardens legends Frank Falcinelli and Frank Castronovo, F&F is the spot for the crispy, chewy, cheesy, perfectly balanced Brooklyn slice youve been looking for. Its also the one everyone else is looking for, so go early and expect a line.",
	},
	{
		'owner_id': 24,
		'name': "Joloff",
		'price_rating': 4,
		'img_url':
			"https://static01.nyt.com/images/2019/06/26/dining/24Nigerianrex1/merlin_156459840_f874ce2c-2a73-4c58-b4e4-15cf91169bbb-articleLarge.jpg",
		'phone_number': "2124905813",
		'website': "https://www.joloffjoloff.com/",
		'street_address': "1168 Bedford Ave,, 11215",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "8:00AM - 2:00PM",
		'description':
			"No, you havent just walked into your aunt and uncles living room, but at Joloff, it sure will feel like it. The patterned textile tablecloths, turquoise walls, and black-and-white portraits all make for a laid-back, homey environment run by a staff thats warm and familiar. The food—a wide selection of deeply comforting West African dishes like tamarind-laced lamb shank, vegetarian okra stew, and jollof—only makes it feel cozier. Bring friends: The portions are generous and its best to order family style to appreciate the restaurants breadth.",
	},
	{
		'owner_id': 19,
		'name': "Nami Nori",
		'price_rating': 2,
		'img_url': "https://media.timeout.com/images/105527554/image.jpg",
		'phone_number': "2122527756",
		'website': "https://naminori.nyc/",
		'street_address': "33 Carmine St, 10014",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"Youll be incredibly tempted to order one of every temaki (Japanese-style hand roll) upon first read-through of the dynamic menu at this spare yet stylish counter from Masa alums. And really, we dont love having to choose: Buttery scallops in XO sauce? Creamy squash enlivened with ginger and scallion? Or huge pearls of salmon roe? The good news is, each fist-size package with warm white rice and perfectly crisp nori is so thoughtfully made that you cant go wrong. And better yet: Theyre just small enough that you can easily put down a few of them, and still have room to go back for more.",
	},
	{
		'owner_id': 2,
		'name': "J.G. Melon",
		'price_rating': 1,
		'img_url':
			"https://usmenuguide.com/wp-content/uploads/2019/09/jgmelonnewyork35.jpg",
		'phone_number': "2125478961",
		'website': "https://jgmelon-nyc.com/",
		'street_address': "1291 3rd Ave, 10021",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "10:00AM - 9:00PM",
		'description':
			"The watermelon-themed decorations, green-checked tablecloths, and long-time employees give this legendary burger joint a vibe that feels permanent in the most special way, just like the years of seasoning that coat the sizzling griddle. Its impossible to not feel like a true New Yorker when eating a burger at the original Upper East Side location (there are now two others in Manhattan). Its an institution.",
	},
	{
		'owner_id': 15,
		'name': "Ootoya",
		'price_rating': 1,
		'img_url':
			"https://ootoya.us/wp-content/uploads/2015/05/Times-Square-Screen-shot-2014-06-27-at-11.12.38.jpg",
		'phone_number': "2121373294",
		'website': "https://ootoya.us/",
		'street_address': "141 W 41st St, 10036",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "8:00AM - 2:00PM",
		'description':
			"No matter how crowded this homestyle Japanese restaurant is, it feels like a respite from a world where you are at permanent risk of being accosted by an adult dressed like a furry animal. Whether youre going post-work or pre-theater, Ootoyas generous portions of extra-crispy tonkatsu (fried pork cutlet) or simple preparations of grilled fish (like mackerel) have restorative properties.",
	},
	{
		'owner_id': 17,
		'name': "Atoboy",
		'price_rating': 2,
		'img_url':
			"https://img1.10bestmedia.com/Images/Photos/334843/p-img-MG-6599-copy-f_55_660x440.jpg",
		'phone_number': "2122862683",
		'website': "https://www.atoboynyc.com/",
		'street_address': "43 E 28th St, 10016",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "8:00AM - 2:00PM",
		'description':
			"The mini tasting menu that chef-owner Junghyun Park serves inside his futuristic-looking Korean restaurant is neither precious nor pretentious, thanks to the warm service and free flow of genre-bending dishes that change with the seasons. Pick three dishes for a set price ($46!) and order strategically with your companions so you get to try as much of the menu as possible.",
	},
	{
		'owner_id': 18,
		'name': "The Food Sermon",
		'price_rating': 2,
		'img_url':
			"https://cdn.vox-cdn.com/thumbor/NbLJBvhQ1fWl2IwKHTU5leYPaCw=/0x0:1080x718/920x613/filters:focal(454x273:626x445):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/70101459/tfs_offerings.14.jpg",
		'phone_number': "2128707087",
		'website': "https://www.thefoodsermon.com/",
		'street_address': "141 Flushing Ave Building 77, 11205",
		'borough': "Queens",
		'accessible': True,
		'hours': "8:00AM - 2:00PM",
		'description':
			"You had big plans to cook a healthy, hearty Sunday dinner, but wow, its already six oclock. If youre lucky enough to live in the Food Sermons radius, a delicious Caribbean dinner is minutes from your door. We swear, these delivery bikes have jet packs. But if you need to get out of the apartment, theres no such thing as a bad seat in this tiny spot: The counter running along the windows provides just as good a view for people watching outside as it does for watching cooks assembling the vibrant bowls inside.",
	},
	{
		'owner_id': 9,
		'name': "Tanoreen",
		'price_rating': 4,
		'img_url':
			"https://cdn.vox-cdn.com/thumbor/Bpb2XSu3OnKd5dU0ss4k2aCQSuY=/0x0:5760x3840/1200x0/filters:focal(0x0:5760x3840):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/23016531/Tanoreen_10.jpg",
		'phone_number': "2129104307",
		'website': "http://tanoreen.com/",
		'street_address': "7523 3rd Ave, 11209",
		'borough': "Manhattan",
		'accessible': False,
		'hours': "10:00AM - 9:00PM",
		'description':
			"Sometimes you want it all: copious amounts of appetizers, a sizable entrée, and a worth-it dessert. Tanoreen is there for you with tahini-laced vegetables and Middle Eastern meat dishes that are big enough for sharing. But the real star is the knafeh, a cheese-based dessert with thin layers of sweetened noodles. Get the large, even if youre very full.",
	},
	{
		'owner_id': 11,
		'name': "Takumen",
		'price_rating': 4,
		'img_url':
			"https://d1ralsognjng37.cloudfront.net/54f5e22a-c65f-4cc7-a941-03b1d3aa2610.jpeg",
		'phone_number': "2121656148",
		'website': "http://www.takumenlic.com/",
		'street_address': "5-50 50th Ave, 11101",
		'borough': "Queens",
		'accessible': True,
		'hours': "10:00AM - 9:00PM",
		'description':
			"Pop through Takumens yellow door to grab a matcha latte and a buttery croissant to-go, or grab seats in the wood-clad dining room for chewy ramen noodles in deeply flavorful sauce, hefty rice bowls, and impossibly crispy chicken wings. Its the perfect place to fuel up before visiting MoMA PS1 or the Noguchi Museum.",
	},
	{
		'owner_id': 14,
		'name': "Cervos",
		'price_rating': 1,
		'img_url':
			"https://www.carpecity.com/wp-content/uploads/2019/09/Cervos-Restaurant.jpg",
		'phone_number': "2127806806",
		'website': "https://www.cervosnyc.com/",
		'street_address': "43 Canal St, 10002",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"Why is this new-school Portuguese gem from the team behind Hot 10 winner Harts and rotisserie hotspot The Fly the perfect hangout for two? Because A) the best seats in this sliver of a space are those at the slim counter that runs the length of the bar and curves around the small open kitchen, and B) youre going to be protective of every last drop of the garlicky sauces left over from the perfectly cooked seafood.",
	},
	{
		'owner_id': 18,
		'name': "Mapo Korean BBQ",
		'price_rating': 3,
		'img_url':
			"http://cdn3.vox-cdn.com/uploads/chorus_asset/file/800048/13847829054_f33d1b199a_b.0.jpg",
		'phone_number': "2122469655",
		'website': "https://www.yelp.com/biz/mapo-bbq-flushing-2",
		'street_address': "149-24 41st Ave, 11355",
		'borough': "Manhattan",
		'accessible': False,
		'hours': "8:00AM - 2:00PM",
		'description':
			"Youll need to take the Long Island Railroad to get here and probably drag a friend who speaks Korean (or Mandarin—the staff speaks both), but this old-school spot is worth all that planning ahead. Its one of the few charcoal-powered Korean barbecue restaurants in New York, which gives the galbi the perfect touch of smoke that Midtowns hot spots just cant compete with.",
	},
	{
		'owner_id': 16,
		'name': "Wildair",
		'price_rating': 2,
		'img_url':
			"https://infatuation.imgix.net/media/reviews/wildair/banners/Wildair_0.jpg",
		'phone_number': "2126828004",
		'website': "https://www.wildair.nyc/",
		'street_address': "142 Orchard St, 10002",
		'borough': "Brooklyn",
		'accessible': False,
		'hours': "10:00AM - 9:00PM",
		'description':
			"This small space on Orchard Street is a scene (in a good way). Its packed with in-the-know diners who are just as interested in Austrian pét-nat as they are in fried squid. Youll go for the wine list and end up ordering the whole menu. Or youll go for dinner and become obsessed with the wine list. Either way, go.",
	},
	{
		'owner_id': 10,
		'name': "The Bar at Momofuku Ko",
		'price_rating': 3,
		'img_url':
			"https://cdn.vox-cdn.com/thumbor/cjBouwxiOEPLiZ4aBYQHSyBUEO4=/0x0:2400x1603/1200x0/filters:focal(0x0:2400x1603):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/8527297/NS011706.jpg",
		'phone_number': "2121485305",
		'website': "https://ko.momofuku.com/home/menu/",
		'street_address': "8 Extra Pl, 10003",
		'borough': "Manhattan",
		'accessible': False,
		'hours': "8:00AM - 2:00PM",
		'description':
			"You could go to David Changs lauded Momofuku Ko and drop $255 a person (sans booze) on an epic tasting-menu experience… or you could take a detour and dip into the walk-in-only bar and hit a few (remarkably affordable) highlights. The nose-clearing mustardy pickle sandwich costs $5. The so-weird-it-works cold fried chicken is $6 per piece (but, uh, get more than one piece). And the deliciously rich $45 duck pie can and should be split among a few friends. Its like a tasting menu on your terms.",
	},
	{
		'owner_id': 23,
		'name': "Randazzos Clam Bar",
		'price_rating': 4,
		'img_url':
			"https://cdn.vox-cdn.com/thumbor/uRunkPT4Cmh_I0ian8I0pl4A7EI=/0x0:500x332/1200x800/filters:focal(210x126:290x206)/cdn.vox-cdn.com/uploads/chorus_image/image/61177137/5936714303_464cbdce6b_o.0.0.1526066843.0.jpg",
		'phone_number': "2121145606",
		'website': "https://randazzosclambar.nyc/",
		'street_address': "2017 Emmons Ave, 11235",
		'borough': "Manhattan",
		'accessible': False,
		'hours': "10:00AM - 9:00PM",
		'description':
			"The bright, carnival-esque signage tells you everything you need to know about the folks at Randazzos: Theyve been around for a while. Subtlety is not their specialty. And they serve seafood that tastes as classically Italian-American as their name suggests. This is the no-frills Brooklyn-Italian experience youve been searching for.",
	},
	{
		'owner_id': 3,
		'name': "Deluxe Green Bo",
		'price_rating': 4,
		'img_url':
			"https://media-cdn.tripadvisor.com/media/photo-s/14/8c/94/9d/deluxe-green-bo-exterior.jpg",
		'phone_number': "2121694566",
		'website': "https://www.deluxegreenbo.com/",
		'street_address': "66 Bayard St, 10013",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "8:00AM - 2:00PM",
		'description':
			"Real Green Bo fanatics will remember this restaurant as Nice Green Bo, but while the name has changed the high quality of the food hasnt. Most venture to the weathered Bayard Street haunt for fried rice or noodles with pork and fermented cabbage (the house specialty), but the soup dumplings are some of the best in the city. Share everything and bring cash.",
	},
	{
		'owner_id': 18,
		'name': "Café Altro Paradiso",
		'price_rating': 3,
		'img_url':
			"https://media.cntraveler.com/photos/5775872a12494f3d76485118/16:9/w_2560,c_limit/CafeAltroParadiso-NYC-credit_David_Sullivan.jpg",
		'phone_number': "2128993883",
		'website': "https://www.altroparadiso.com/",
		'street_address': "234 Spring St, 10013",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "10:00AM - 9:00PM",
		'description':
			"There might not be a more complete date-night restaurant in New York City. The large, humming room. The breezy, contemporary design. The warm, gentle glow. The well-balanced wine list. The innovative but approachable cocktails. The soulful playlists. The amaro list. The dessert wine. The sorbet. And thats to say nothing of Ignacio Mattos menu of modern, shareable Italian plates, or Natasha Pickowiczs stunning desserts. Bring someone you want to impress...without seeming like youre trying to impress them.",
	},
	{
		'owner_id': 14,
		'name': "Win Son",
		'price_rating': 4,
		'img_url':
			"https://cdn.vox-cdn.com/thumbor/3GvqRAa_QZAbojudDSH1iQqtQII=/0x0:5000x3333/1200x675/filters:focal(2143x1231:2943x2031)/cdn.vox-cdn.com/uploads/chorus_image/image/58837959/second.0.jpg",
		'phone_number': "2123708836",
		'website': "https://winsonbrooklyn.com/",
		'street_address': "159 Graham Ave, 11206",
		'borough': "Manhattan",
		'accessible': False,
		'hours': "5:00PM - 10:00PM",
		'description':
			"The new-school Taiwanese spot is best enjoyed with a group of at least four (or fewer, who really know how to eat). And its always more enjoyable if those people arent opposed to an impromptu round of shots (which staff may or may not encourage) between excellent fried eggplant and spicy flys head (minced pork, fermented beans, chives, and chiles). Win Son is always slammed, so show up early and be ready to hang out by the bar with a drink while you wait.",
	},
	{
		'owner_id': 6,
		'name': "Uncle Boons",
		'price_rating': 1,
		'img_url':
			"https://images.squarespace-cdn.com/content/v1/52b9be06e4b013dbd6fb5f3e/1413134958379-SSTBC9CSR7CL41LL772A/UncleBoons_ESP4569.jpg?format=1500w",
		'phone_number': "2123365964",
		'website': "http://www.uncleboons.com/",
		'street_address': "7 Spring St, 10012",
		'borough': "Queens",
		'accessible': True,
		'hours': "8:00AM - 2:00PM",
		'description':
			"Two hours?! Okay, fine. Youll be glad you waited once you have that first bite of crispy lamb wrapped in lettuce. Uncle Boons is the Thai restaurant that never lets us down—the one that makes everyone happy, out-of-town relatives and fussy coworkers included. Every bite is fire—whether that means its spicy or straight awesome. Always over-order.",
	},
	{
		'owner_id': 7,
		'name': "Keens Steakhouse",
		'price_rating': 3,
		'img_url':
			"https://upload.wikimedia.org/wikipedia/commons/9/9d/Keens_Steakhouse_%28Manhattan%2C_New_York%29_001.jpg",
		'phone_number': "2127014746",
		'website': "https://www.keens.com/",
		'street_address': "72 W 36th St, 10018",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "10:00AM - 9:00PM",
		'description':
			"Never has a piece of meat received as much attention as the mutton chop from this historic steakhouse (est. 1885!). But theres more to love about Keens than the fabled two-pound lamb saddle chop (ehem, not actually mutton). Theres the deep list of single-malt Scotches. Waiters dressed in black bow ties and pressed red vests. The expertly stirred martinis. And its got one of the largest collections of churchwarden tobacco pipes in the world—which youll see hanging from the ceiling, as you lean back and pat your belly.",
	},
	{
		'owner_id': 18,
		'name': "Adda",
		'price_rating': 2,
		'img_url':
			"https://pyxis.nymag.com/v1/imgs/a4a/31d/8311e8ebbcd45f71a1ba8d79f6d2a4c82d-adda-01.rsocial.w1200.jpg",
		'phone_number': "2124694374",
		'website': "https://www.addanyc.com/",
		'street_address': "31-31 Thomson Ave, 11101",
		'borough': "Brooklyn",
		'accessible': False,
		'hours': "10:00AM - 9:00PM",
		'description':
			"Come to Adda as a group of four. Any fewer and you wont make a dent in the menu, any more and it might be awhile before one of the tables in the energetic room opens up. Load up on whatever you need (mango lassis? Limca sodas? Chardonnay from the Finger Lakes?) to power through the purposeful heat and powerful spices at the backbone of the menu, from the array of snacks you wont be able to get enough of at the start of the meal to the slow-cooked goat biryani youll take home with you when you finally and unwillingly call it quits.",
	},
	{
		'owner_id': 8,
		'name': "Bernies",
		'price_rating': 1,
		'img_url':
			"https://byoblikeaboss.com/wp-content/uploads/2018/11/bernies-2.w710.h473.2x.jpg",
		'phone_number': "2127712947",
		'website': "https://www.berniesnyc.com/",
		'street_address': "332 driggs ave, 11222",
		'borough': "Brooklyn",
		'accessible': False,
		'hours': "10:00AM - 9:00PM",
		'description':
			"Oversized mahogany booths. Red-and-white checkered tablecloths. Dim lights. Stained-glass chandeliers. Crispy fries. Frosty mugs of lager. And a staff that knows exactly how to treat you. Bernies is the no-fuss, Americana-fueled neighborhood restaurant thats as perfect for a quick, cold martini as it is for camping out all night with one of New York Citys best burgers. Our official recommendation is to start with the first option, and then stay for the latter.",
	},
	{
		'owner_id': 23,
		'name': "Ops",
		'price_rating': 1,
		'img_url':
			"https://pyxis.nymag.com/v1/imgs/2ba/7c2/5ea738656ff6ef24550f24701f70422c4d-ops-01.rsocial.w1200.jpg",
		'phone_number': "2127947167",
		'website': "http://www.opsbk.com/",
		'street_address': "346 Himrod St, 11237",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"When decision fatigue is the diagnosis, this buzzy Brooklyn pizza place is the cure. The menus are the size of Hallmark cards, featuring a short list of house cocktails, a handful of snacks, exactly one (always perfect) farmers market salad that changes daily, and the main event: a selection of perfectly blistered, thoughtfully topped, naturally leavened pizzas. There isnt even a wine list to worry about. Tell your server what you like, and theyll bring you tastes from the ever-changing lineup of natural wines—$14 per glass, $50 per bottle, always.",
	},
	{
		'owner_id': 11,
		'name': "L&B Spumoni Gardens",
		'price_rating': 1,
		'img_url':
			"https://1w0eqx36klwk3lol8s1na5ig-wpengine.netdna-ssl.com/wp-content/uploads/2019/04/IMG_2826.jpeg",
		'phone_number': "2129687953",
		'website': "https://spumonigardens.com/",
		'street_address': "2725 86th St, 11223",
		'borough': "Queens",
		'accessible': True,
		'hours': "10:00AM - 9:00PM",
		'description':
			"This spectacular spaghetti palace, open since 1939, is worth the trek to Bensonhurst, especially for big group dinners with zero plans for later—lying flat on your back is the only thing youll want to do after eating here. Most pilgrims come for the Sicilian-style pizza (not a bad plan), but if youre making the trip, go for the four-course family-style Chefs Table menu. How else will you experience Dueling Shrimp, an oversize platter of shrimp, half fried, half boiled?",
	},
	{
		'owner_id': 10,
		'name': "Silver Rice",
		'price_rating': 4,
		'img_url':
			"https://images.getbento.com/accounts/a67130d19f6cbe280b999c9b1ac92a02/media/images/48087All_6-2.jpg?w=1200&fit=max&auto=compress,format",
		'phone_number': "2121475559",
		'website': "https://www.silverrice.com/",
		'street_address': "638 Park Pl, 11238",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"This raw fish-obsessed city will never be short on incredible $200 omakase tasting menus. But omakase-level takeout sushi for under $20? That only exists at Silver Rice, a bright, tiny sushi and sashimi spot with two locations in Brooklyn. The fresh rolls here are stuffed with pristine fish thats worlds away from the mystery pink sludge some spots dub “spicy tuna.” But the real move here is the fishermans bowl, brimming with chunks of salty snow crab, bright-orange ribbons of salmon, sweet raw scallops, and more over a bed of perfectly seasoned sushi rice.",
	},
	{
		'owner_id': 12,
		'name': "Casa Enrique",
		'price_rating': 4,
		'img_url':
			"http://img1.wsimg.com/isteam/ip/122bba32-69b4-4d0b-a845-9da9aa876009/casa_enrique-1__large-0001.jpg",
		'phone_number': "2126183633",
		'website': "https://casaenriquelic.com/",
		'street_address': "5-48 49th Ave, 11101",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "8:00AM - 2:00PM",
		'description':
			"To say that Casa Enrique is a restaurant that serves amazing enchiladas is both telling the truth and selling it short. The saucy, stuffed tortillas are profoundly flavorful and comforting, but so is every other Mexican dish served at this LIC staple. Go for a lazy dinner and do not stop after your second margarita.",
	},
	{
		'owner_id': 17,
		'name': "Insa",
		'price_rating': 4,
		'img_url':
			"https://images.squarespace-cdn.com/content/v1/55e207f4e4b023ac4139198b/1542465095360-UYSFSHJND22J3N3LZJV4/image_home-01.jpg?format=2500w",
		'phone_number': "2125666832",
		'website': "https://www.insabrooklyn.com/",
		'street_address': "328 Douglass St, 11217",
		'borough': "Lower East Side",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"Usually belting out the words to Fleetwood Macs “Landslide” inside a restaurant would get you kicked out. But at Insa, its quite the opposite. After you finish up an ambitious spread of banchan and a sizable quotient of sizzling pork belly, you and your crew can head to a separate section of the restaurant and start singing (slightly off-key) karaoke in a private room.",
	},
	{
		'owner_id': 11,
		'name': "Scarrs Pizza",
		'price_rating': 4,
		'img_url':
			"https://storage.googleapis.com/thehundreds/media/2018/08/Scarrs-pizza_the-hundreds-sammy-ian-sdj_01-1024x682.jpg",
		'phone_number': "2123841761",
		'website': "https://www.scarrspizza.com/",
		'street_address': "22 Orchard St, 10002",
		'borough': "Queens",
		'accessible': False,
		'hours': "8:00AM - 2:00PM",
		'description':
			"The only thing stronger than the “old-school slice-joint vibe” at Scarrs is the pizza itself. Flour is milled in-house, and pies are baked to perfection in two small ovens in the front of the shop. Sit in the faux wood–paneled back room—either at the bar with a glass of pét-nat, or at one of the four molded plywood booths with a pitcher of Presidente—and dig into a Sicilian slice with pepperoni or a classic slice with mushrooms. Then try convincing yourself that youre as cool as the trendy Lower East Side ensembles surrounding you. Do it on a weeknight, though. Fridays and Saturdays are truly swamped.",
	},
	{
		'owner_id': 23,
		'name': "Wayla",
		'price_rating': 2,
		'img_url':
			"https://images.squarespace-cdn.com/content/v1/5b70995c75f9ee2c70e5f98f/1562776285029-D5L27TAB5183ASTSVHIK/WAYLA+GARDEN.jpg?format=1500w",
		'phone_number': "2125517546",
		'website': "https://www.waylanyc.com/",
		'street_address': "100 Forsyth St, 10002",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"We wont pretend like its not going to be crowded. Everyone on the Lower East Side is going to Wayla for big-flavor homestyle Thai food, including us. Think fresh curries with brilliant aromas; whole fried fish seasoned with ginger, dried chiles, and shallots; and fish sauce aplenty. But the one menu item that should land on every table is the nam prik platter, a beautiful spread of vegetables—like Thai eggplant, steamed squash, lettuces, long beans, and okra—served with mushroom, shrimp, and pork dips. Order it for the table. And definitely make a reservation.",
	},
	{
		'owner_id': 25,
		'name': "Astoria Seafood",
		'price_rating': 2,
		'img_url': "https://cms.prod.nypr.digital/images/292737/fill-1200x650/",
		'phone_number': "2127884185",
		'website': "https://www.astoriaseafoodnyc.com/",
		'street_address': "3710 33rd St, 11101",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"There wont be a moment of serenity during your time at this Greek BYOB. Counter staff shout orders to cooks. Chefs shout at waiters. Guests shout to one another. Its loud. And its fun. Especially because you get to walk alongside the beds of ice and choose whichever fish, bivalves, and shellfish look good, and then tell the staff how to cook them. You hold all the cards, especially since its a BYOB.",
	},
	{
		'owner_id': 12,
		'name': "Lois",
		'price_rating': 1,
		'img_url': "https://pbs.twimg.com/media/C_ZjlYbUQAAsEBh.jpg",
		'phone_number': "2126915079",
		'website': "http://www.loisbarnyc.com/",
		'street_address': "98 Loisaida Ave, 10009",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"The lights are low, the natural wine is on tap, and the ample cheese plate comes with a schmear of miso-mustard dressing. The music varies, but its always a vibe. Ask the approachable bartenders whats new on the tap list, taste a few wines, and then commit to a carafe and a spot by the windows.",
	},
	{
		'owner_id': 10,
		'name': "As Is",
		'price_rating': 3,
		'img_url':
			"https://images.squarespace-cdn.com/content/v1/561829aee4b0ae8c3b9397b9/1620668155582-LWBT7BS1GT6EO3X1ADQB/458_04_PLD_As_Is_Bar_056.05b379ea1a8750a16670448b75380200.jpg?format=2500w",
		'phone_number': "2128363986",
		'website': "https://www.asisnyc.com/",
		'street_address': "734 10th Ave, 10019",
		'borough': "Brooklyn",
		'accessible': False,
		'hours': "10:00AM - 9:00PM",
		'description':
			"The bar scene in Hells Kitchen is, well, hellish. But As Is deviates from the neighborhood norm. This beautifully designed bar—with tiled floors, dark woods, and custom light fixtures—rotates more than a dozen of the most exciting taps in the city (highlighting local faves Grimm Artisanal Ales, Other Half Brewing, and Mikkeller NYC, as well as beers from grail-worthy breweries Hill Farmstead and Cantillon), and puts just as much emphasis on fun and accessibility as it does on beer quality. This is the craft beer bar for beer nerds and novices alike.",
	},
	{
		'owner_id': 2,
		'name': "Honeys",
		'price_rating': 4,
		'img_url':
			"https://goop-img.com/wp-content/uploads/2018/04/Honeys1_preview.jpeg",
		'phone_number': "2121613001",
		'website': "https://honeysbrooklyn.com/",
		'street_address': "93 Scott Ave, 11237",
		'borough': "Brooklyn",
		'accessible': False,
		'hours': "10:00AM - 9:00PM",
		'description':
			"They make mead at the aptly named Honeys, but that doesnt mean you have to drink the fermented honey water if you go here. This corner bar with a neon-pink sign is run by mad-scientist bartender Arley Marks, who also curates the short list of deep-cut natural wines from all over the world and cocktails like the Hola Yola, made with Yola mezcal, wildflower mead (yup!), byrrh grand quinquina (a French aperitif), and a spritz of absinthe.",
	},
	{
		'owner_id': 2,
		'name': "Gold Star Beer Counter",
		'price_rating': 2,
		'img_url':
			"https://images.squarespace-cdn.com/content/v1/51674329e4b0af794de7203a/1470770084776-6KYGR8WOA29NVPBCMTI3/%C2%A9SariGoodfriend_GoldStar_DSF0278.JPG?format=1000w",
		'phone_number': "2124976251",
		'website': "http://goldstarbeercounter.com/",
		'street_address': "176 Underhill Ave, 11238",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "10:00AM - 9:00PM",
		'description':
			"Gold Star Beer Counter is two things: a bar and a bottle shop. But whether youre drinking a Belgian saison there or taking some hazy cans of IPA to-go, its absolutely one of the best places in the five boroughs to get a beer. And yes, you can walk right up to the window from the sidewalk and buy said beer.",
	},
	{
		'owner_id': 2,
		'name': "Achilles Heel",
		'price_rating': 2,
		'img_url':
			"https://dxbowaj7shf9g.cloudfront.net/uploads/user_place/image/1739/large_14-achilles-heel.w710.h473.2x.jpg",
		'phone_number': "2129754287",
		'website': "https://www.achillesheelnyc.com/",
		'street_address': "180 West St, 11222",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"Four friends walk into a bar. One wants a glass of easy-drinking red. Another wants a cold can of Genesee. The third could go for a bubbly spritz laced with Averna. And the fourth would rather go straight to pasta with braised pork and white beans. That bar is Achilles Heel—a 100-plus-year-old neighborhood spot on a corner in Greenpoint that has...something for everyone.",
	},
	{
		'owner_id': 11,
		'name': "Bar Goto",
		'price_rating': 4,
		'img_url':
			"https://www.liquor.com/thmb/HRuO5a4MWLm-zNMtTJJ0endXPHU=/720x540/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__liquor__2017__03__09105706__How-Bar-Goto-Got-It-Right-720x720-article-454e97b5c812424990bc2cb6092e4044.jpg",
		'phone_number': "2122007686",
		'website': "https://www.bargoto.com/",
		'street_address': "245 Eldridge St, 10002",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "10:00AM - 9:00PM",
		'description':
			"The confines of this thoughtfully designed jewel box are modeled after Tokyos intimate cocktail bars, with a wall of Japanese whiskies and a compact list of craveable bar snacks to soak it all up. The tables are close, providing excellent eavesdropping opportunities. Take full advantage of the cocktail list.",
	},
	{
		'owner_id': 13,
		'name': "Josies Bar",
		'price_rating': 2,
		'img_url':
			"https://pyxis.nymag.com/v1/imgs/2e5/a24/a9afd0dd1e43f1d48f3badd1ff4e47d807-josies-01.rsocial.w1200.jpg",
		'phone_number': "2127776776",
		'website': "https://josiewoodsnyc.com/",
		'street_address': "520 E 6th St, 10009",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "10:00AM - 9:00PM",
		'description':
			"Theres a bouncer at Josies. And probably some NYU students. And maybe a group of washed-up East Village punk rockers. And definitely someone running the pool table. But Josies is a dive bar. This is what you signed up for.",
	},
	{
		'owner_id': 5,
		'name': "The Ten Bells",
		'price_rating': 4,
		'img_url': "http://www.tenbellsnyc.com/images/photos/17.jpg",
		'phone_number': "2128647224",
		'website': "http://www.tenbellsnyc.com/",
		'street_address': "247 Broome St, 10002",
		'borough': "Manhattan",
		'accessible': False,
		'hours': "5:00PM - 10:00PM",
		'description':
			"Wine bars are frequently plagued by pretentiousness. The Ten Bells is not, and it boasts one of the most well-rounded and exciting lists of by-the-glass natural wine in the city. Its filled with young, loud, joyous people there to have a good time in the spaces warm orange glow (which makes everything and everyone look more attractive). Show up early and stay late. Spots at the bar—especially on weekends—are coveted.",
	},
	{
		'owner_id': 20,
		'name': "Bemelmans Bar",
		'price_rating': 2,
		'img_url':
			"https://images.rosewoodhotels.com/is/image/rwhg/Bemelmans%20Bar%20HIGH%20RES%20(Don%20Riddle)",
		'phone_number': "2126593016",
		'website':
			"https://www.rosewoodhotels.com/en/the-carlyle-new-york/dining/bemelmans-bar",
		'street_address': "35 E 76th St, 10021",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "10:00AM - 9:00PM",
		'description':
			"A live piano player. Expertly made classic cocktails. Walls painted by Ludwig Bemelmans, the guy who illustrated Madeline. All inside an iconic Art Deco hotel that has discreetly housed the worlds most famous actors, politicians, and musicians. (Jagger! Princess Di! JFK! Anjelica Huston and Jack Nicholson! Were talking about The Carlyle! Hello!) This is Upper East Side ambiance in its purest form—with prices to match (not to mention the cover charge after 9:30 p.m.).",
	},
	{
		'owner_id': 7,
		'name': "Old Town Bar",
		'price_rating': 2,
		'img_url': "https://media.timeout.com/images/100492237/image.jpg",
		'phone_number': "2125815951",
		'website': "http://www.oldtownbar.com/",
		'street_address': "45 E 18th St, 10003",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"Whether or not youre using them, its important to know that Old Town Bar has the oldest urinals in New York City. Aside from that, the long mahogany bar is well-polished from a century of forearm leans. The booths are cozy enough to keep your secrets. And the dumbwaiters are still bringing fries down from the kitchen upstairs. If it feels familiar, thats because youve seen it before: The bars shown up in everything from The Marvelous Mrs. Maisel to House of Pains music video for “Jump Around.”",
	},
	{
		'owner_id': 17,
		'name': "Lovers Rock",
		'price_rating': 3,
		'img_url':
			"https://static01.nyt.com/images/2015/12/17/fashion/17BOITE/17BOITE-superJumbo.jpg",
		'phone_number': "2122223623",
		'website': "https://loversrocknyc.com/",
		'street_address': "419 Tompkins Ave, 11216",
		'borough': "East Village",
		'accessible': True,
		'hours': "8:00AM - 2:00PM",
		'description':
			"This Bed-Stuy bar wasnt around in the 90s, but you wouldnt know it from the exposed red light bulbs, palm tree iconography, and thumping Caribbeats. If the need to escape that vibe for a minute overwhelms you, the backyard is big and comfortable.",
	},
	{
		'owner_id': 16,
		'name': "The Long Island Bar",
		'price_rating': 1,
		'img_url':
			"https://www.nydailynews.com/resizer/KX74Y8OZ9EGYj0jTxm5e6TkyRZg=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/ON54R6B7SGRQL5NLBLKBNOBMWI.jpg",
		'phone_number': "2121489507",
		'website': "http://thelongislandbar.com/",
		'street_address': "110 Atlantic Ave, 11201",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"Things that make this Cobble Hill bar an excellent place to drink: The classic-leaning cocktails are well-crafted but not precious. (There are no “mixologists” here!) The restored midcentury interior is stylish but not fancy. And the thin-patty burger is exactly what youll want to eat with that second cocktail. Oh, and you can usually get a seat no problem.",
	},
	{
		'owner_id': 19,
		'name': "Kindred",
		'price_rating': 4,
		'img_url':
			"https://images.squarespace-cdn.com/content/v1/5ba550af7d0c913d95cd8c86/1636221671150-21RPGC50L0Y5OPODQVAC/KindredInteriorJenahMoon.jpeg",
		'phone_number': "2123094441",
		'website': "https://www.kindred-nyc.com/",
		'street_address': "342 E 6th St, 10003",
		'borough': "Manhattan",
		'accessible': False,
		'hours': "8:00AM - 2:00PM",
		'description':
			"You can go to any red sauce joint in New York and get a glass of cheap Chianti. And while youre Dad might be happy with that, were looking for Italian wine with a bit more to say, which is why we hit Kindred for our Italian by-the-glass needs. Think high-acid rosato from Umbria; floral skin contact whites from Puglia; fresh, fruit-forward reds from Abruzzo; and yeah, maybe even some Chianti too. (Theres also a solid number of Eastern European options, from Slovenia and Croatia namely.) The spot, the second from folks at Ruffian nearby, is pretty perfect for a quick, pre-dinner drink at the intimate bar. But if your open to a multi-hour affair, wed suggest investigating the dinner menu too. You know, for stamina.",
	},
	{
		'owner_id': 7,
		'name': "Sake Bar Satsko",
		'price_rating': 2,
		'img_url':
			"https://images.squarespace-cdn.com/content/v1/5a273469be42d66c973a4592/1513011747356-HI5UOS3I594AOB7JWZM3/image.png",
		'phone_number': "2127027349",
		'website': "https://www.satsko.com/",
		'street_address': "202 East 7th Street, 10009",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "8:00AM - 2:00PM",
		'description':
			"Satsko is one of those rare specialty bars that has somehow managed to still feel like a true neighborhood spot. This tiny Alphabet City bar is staffed by bartenders who really want to serve you sake. The list is on the smaller side but filled with everything from clean, dry junmai ginjo to weirder, fruity, unpasteurized varieties. The bartenders—who control the playlists featuring a mix of soul, disco, electronic, chill-wave, and ambient music—also have very good taste in tunes.",
	},
	{
		'owner_id': 3,
		'name': "Great N.Y. Noodletown",
		'price_rating': 3,
		'img_url':
			"https://blog.resy.com/wp-content/uploads/2020/09/IMG_7524-2000x1125.jpeg",
		'phone_number': "2123278588",
		'website': "https://www.yelp.com/biz/great-ny-noodle-town-new-york",
		'street_address': "28 Bowery, 10013",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "8:00AM - 2:00PM",
		'description':
			"It would take you months to work your way through the entire menu at this Chinatown mainstay. From barbecued meats to crispy noodles, dumpling soup to congee, ginger-soaked greens to bottles of Tsingtao, Great N.Y. Noodletown is a Chinatown MVP for good reason. Show up with a crew, order aggressively (and selectively), and add chile sauce or ginger scallion sauce to everything.",
	},
	{
		'owner_id': 16,
		'name': "The Commodore",
		'price_rating': 2,
		'img_url':
			"https://media.cntraveler.com/photos/5e569afb2855120008b02d86/16:9/w_1280,c_limit/TheCommodore-Charleston-2020-1.jpg",
		'phone_number': "2125002365",
		'website': "https://www.thecommodorebrooklyn.com/",
		'street_address': "366 Metropolitan Ave, 11211",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "8:00AM - 2:00PM",
		'description':
			"If you want to eat a phenomenal hot chicken sandwich without listening to a DJ or bumping into someone doing the two-step, go to this tiki-ish Williamsburg bar on the early side. If youre into a crowded room, occasionally toppled micheladas, and the steady bump of Bronski Beat, go on the later side. Either way youre going to have a good time.",
	},
	{
		'owner_id': 11,
		'name': "Chilos",
		'price_rating': 1,
		'img_url':
			"https://s3.amazonaws.com/revelr-prod/vendor_photos/photos/000/004/038/original/1.jpg?1553792448",
		'phone_number': "2122525342",
		'website': "https://www.chilosbk.com/",
		'street_address': "323 Franklin Ave, 11238",
		'borough': "Manhattan",
		'accessible': False,
		'hours': "5:00PM - 10:00PM",
		'description':
			"No, NYC isnt known for its Mexican food, and this taco truck perma-parked on a dive bar patio isnt going to change that. But once youre a few Tecates and carnitas tacos deep, Chilos might make you feel like youre in Austin or L.A., and sometimes thats enough.",
	},
	{
		'owner_id': 9,
		'name': "Peppas",
		'price_rating': 3,
		'img_url':
			"https://cdn.vox-cdn.com/thumbor/LMi0CgeItc7EH7IEaTGezOsI9ZQ=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22353736/PeppaExterior.jpg",
		'phone_number': "2128464106",
		'website': "https://peppasonline.com/",
		'street_address': "689 Utica Ave, 11203",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "10:00AM - 9:00PM",
		'description':
			"Bars close. Parties end. But Caribbean comfort food at Peppas is forever. Saunter up to the window alongside cabbies, night owls, and neighborhood regulars any time from 10 a.m. to 6 a.m (thats 20 hours of the day), and fill all the braised oxtail–shaped holes in your heart.",
	},
	{
		'owner_id': 7,
		'name': "Veselka",
		'price_rating': 4,
		'img_url':
			"https://pyxis.nymag.com/v1/imgs/628/0af/1994151205c7842c2643c3bde6e39caff6-veselka-1.rsocial.w1200.jpg",
		'phone_number': "2123148938",
		'website': "https://www.veselka.com/",
		'street_address': "144 2nd Ave, 10003",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"Skip the dollar slice and head to Veselka, where partiers, elderly insomniacs, and East Village bar-goers unite over pierogies, borscht, and stuffed cabbage. Yes, this 24/7 spot is uniquely suited for soaking up late-night booze, but be respectful: Youre in a New York institution.",
	},
	{
		'owner_id': 10,
		'name': "Punjabi Deli & Grocery",
		'price_rating': 4,
		'img_url':
			"https://cdn.vox-cdn.com/thumbor/MYUdKyTfebOqDZJu4xXvmtQbg3E=/0x0:720x540/1200x800/filters:focal(0x0:720x540)/cdn.vox-cdn.com/uploads/chorus_image/image/46317948/4296576_iwxoAeIrK-uU2G1_FQsW4vjcfzH5cArv6VGWYxtpDYo.0.0.jpg",
		'phone_number': "2125949637",
		'website': "https://www.yelp.com/biz/punjabi-grocery-and-deli-new-york",
		'street_address': "114 E 1st St, 10009",
		'borough': "The Bronx",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"This tiny Sikh deli just off Houston Street serves generously seasoned South Asian food 24 hours a day, but after 1 a.m. is when you want to show up and survey the scene. Cab drivers run in and out, some to grab a chai and others just to use the restroom. Drunk college students huddle outside over $5 bowls of rice and curried vegetables. Post-shift service workers carry out bags of samosas to take home. The cheap, comforting cooking—which also happens to be vegan (in case you happen to be the type who cares)—appeals to literally everyone whos still awake.",
	},
	{
		'owner_id': 10,
		'name': "Abraço",
		'price_rating': 4,
		'img_url':
			"https://media-cdn.tripadvisor.com/media/photo-s/11/cc/4e/37/interview-of-bar.jpg",
		'phone_number': "2124413856",
		'website': "https://www.abraconyc.com/",
		'street_address': "81 E 7th St, 10003",
		'borough': "Manhattan",
		'accessible': True,
		'hours': "8:00AM - 2:00PM",
		'description':
			"In a Venn diagram of cafés that excel in house-roasted coffee and ones that excel in house-made baked goods, Abraço is the rare occupant of the space where both circles overlap. Visitors can expect an always-full pastry case, the steady drip of deeply flavorful espresso coming from the La Marzocco, jazz reverberating from the turntable, and a patio filled with proud regulars. There isnt a cafe more well-rounded, consistent, and downright cool in the five boroughs. Youll start looking for apartments in the neighborhood as soon as you leave.",
	},
	{
		'owner_id': 23,
		'name': "Sey Coffee",
		'price_rating': 4,
		'img_url':
			"https://foodcurated.com/wp-content/uploads/2018/03/IMG_0082-950x535.jpg",
		'phone_number': "2127007044",
		'website': "https://www.seycoffee.com/",
		'street_address': "18 Grattan St, 11206",
		'borough': "Queens",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"The coffee at Sey is bright, flavorful, and always freshly roasted. (You can see where it all goes down in the back of the greenery-draped open space.) But the real advantage here is the opportunity to learn from incredibly knowledgeable and friendly baristas. Since the beans are roasted in-house, the staff can give you accurate flavor notes, brewing instructions, and origin information about every coffee on the roster.",
	},
	{
		'owner_id': 2,
		'name': "Black Fox Coffee Co.",
		'price_rating': 2,
		'img_url':
			"https://images.squarespace-cdn.com/content/v1/5b196ee731d4df831f0acadd/1561862136029-LI1BMZVOZWW83ENHM30C/4L8A3343.jpg?format=1000w",
		'phone_number': "2127173578",
		'website': "https://blackfoxcoffee.com/",
		'street_address': "70 Pine St, 10005",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "8:00AM - 2:00PM",
		'description':
			"Ordering espresso or cold brew or drip is not enough of a clarification at Black Fox. The downtown coffee capital wants to know how you plan to drink it (hot? With milk? Iced? With tonic?), so staffers can pick the best beans for the job. The selection of beans comes from roasters spanning Vancouver to Boston to Copenhagen and is the most diverse in the city, which means theres always something new to explore.",
	},
	{
		'owner_id': 10,
		'name': "Ginos Pastry Shop",
		'price_rating': 1,
		'img_url':
			"https://www.bronxlittleitaly.com/wp-content/uploads/2015/05/IMG_3180.jpg",
		'phone_number': "2128047263",
		'website': "https://www.ginospastryshop.com/",
		'street_address': "580 E 187th St, 10458",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"After strolling Arthur Avenue—New Yorks real Little Italy—and working your way through all the cheeses and meats, and sandwiches with cheese and meat on them, youre gonna need an espresso break. At Ginos—a bakery so iconic its sign was a prop in a Broadway musical—you can get exactly that, served in a tiny mug decorated with the words “latte,” “macchiato,” “cappuccino.” But dont you dare stop there. Order a cannoli and watch as its filled to order with surgical precision before your grateful eyes. The baker might even slide it across the counter and declare, “Now thats a cannoli.” She means it. Theres nothing soggy about this pastry. Its perfectly crispy and totally sublime. And if you time it right, you might catch Golden Girls playing on the TV in the corner.",
	},
	{
		'owner_id': 9,
		'name': "Té Company",
		'price_rating': 1,
		'img_url':
			"https://media.remodelista.com/wp-content/uploads/2021/03/te-company-nyc-via-manhattan-sideways.jpeg",
		'phone_number': "2129772469",
		'website': "https://tecompanytea.com/",
		'street_address': "163 W 10th St, 10014",
		'borough': "Brooklyn",
		'accessible': True,
		'hours': "5:00PM - 10:00PM",
		'description':
			"Té Company is not a place for rushing. The tea menu is overwhelming in scope, and the food comes when it comes, which is usually not that quickly. Its all part of the charm. This is where you go when youve got nowhere else to be except catching up with an old friend over a pot of expertly sourced Taiwanese tea and some of the most painstakingly flawless pastries in the city.",
	},
	{
		'owner_id': 14,
		'name': "New Flushing Bakery",
		'price_rating': 1,
		'img_url':
			"https://michaelminn.net/newyork/food/queens/new-flushing-bakery/2020-05-26_16-04-15.jpg",
		'phone_number': "2129958077",
		'website': "https://www.yelp.com/biz/new-flushing-bakery-flushing",
		'street_address': "135-45 Roosevelt Ave, 11354",
		'borough': "Manhattan",
		'accessible': False,
		'hours': "10:00AM - 9:00PM",
		'description':
			"The process at this miniscule storefront takes about three minutes: Walk in, ask the woman behind the counter for as many egg tarts as you can carry, pay with cash, accept the paper bag filled with flaky, sweet, eggy pastries, and walk right out. If you cant help yourself, stand on the sidewalk outside and rip through a couple of Flushings premier pastries.",
	},
	{
		'owner_id': 10,
		'name': "Homecoming",
		'price_rating': 1,
		'img_url':
			"https://www.thebohoguide.com/wp-content/uploads/2017/01/New-York-City-31.jpg",
		'phone_number': "2122037141",
		'website': "https://www.homecomingnyc.org/",
		'street_address': "92 Berry St, 11249",
		'borough': "Brooklyn",
		'accessible': False,
		'hours': "8:00AM - 2:00PM",
		'description':
			"Buying a cortado, a ceramic planter, and a snake plant as part of a regular Sunday morning routine may sound like the most Brooklyn thing youve ever heard, but Homecoming is the kind of place where all that can happen—and without becoming a parody of itself.",
	},
]




def seed_restaurants():
	for restaurant in restaurant_list:
		new_restaurant = Restaurant(
			owner_id=restaurant['owner_id'],
			name=restaurant['name'],
			price_rating=restaurant['price_rating'],
			description=restaurant['description'],
			img_url=restaurant['img_url'],
			phone_number=restaurant['phone_number'],
			website=restaurant['website'],
			street_address=restaurant['street_address'],
			borough=restaurant['borough'],
			accessible=restaurant['accessible'])
		new_restaurant.settings.append(Setting.query.get((randint(1, 5))))
		new_restaurant.cuisines.append(Cuisine.query.get((randint(1, 20))))
		db.session.add(new_restaurant)
	db.session.commit()



def undo_restaurants():
	db.session.execute('TRUNCATE restaurants RESTART IDENTITY CASCADE;')
	db.session.commit()
