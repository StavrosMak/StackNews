# StackNews - Modern Tech News Aggregator

A professional, full-stack news aggregation platform built with Next.js 15, TypeScript, and modern web technologies. Features real-time news from multiple APIs, advanced filtering, and a responsive design.


## 🚀 Features


- **Multi-Source News Aggregation**: Integrates NewsAPI, Dev.to, and NYTimes APIs
- **Advanced Search & Filtering**: Real-time search with category-based filtering
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: Seamless theme switching with persistent preferences
- **Favorites System**: Save and manage favorite articles with localStorage
- **Performance Optimized**: SWR caching, image optimization, and lazy loading
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Error Handling**: Comprehensive error boundaries and user feedback


## 🛠️ Tech Stack


### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **SWR** - Data fetching and caching
- **React Context** - State management


### APIs & Data
- **NewsAPI** - General news articles
- **Dev.to API** - Developer-focused content
- **NYTimes API** - Premium news content
- **Axios** - HTTP client for API requests


### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

## 📦 Installation 


1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/stacknews.git
   cd stacknews
   ```


2. **Install dependencies**
   ```bash
   npm install
   ```


3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
   NEXT_PUBLIC_NEWS_API_URL=your_news_url
   NEXT_PUBLIC_NYT_API_KEY=your_nytimes_api_key
   NEXT_PUBLIC_NYT_API_URL=your_nytimes_url
   ```


4. **Run the development server**
   ```bash
   npm run dev
   ```


5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)


## 🏗️ Project Structure


```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── category/          # Category pages
│   └── favorites/         # Favorites page
├── components/            # Reusable React components
├── context/              # React Context providers
├── lib/                  # Utility functions and fetchers
└── types/                # TypeScript type definitions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

 

## 🤝 Contributing


1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

 
## 🙏 Acknowledgments


- [NewsAPI](https://newsapi.org/) for general news content
- [Dev.to](https://dev.to/) for developer-focused articles
- [NYTimes](https://developer.nytimes.com/) for premium news content
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework


---


**Built with ❤️**#   S t a c k N e w s 
 

 #   S t a c k N e w s 
 
 
 
