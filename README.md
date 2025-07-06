# News Aggregator Application  

A modern news aggregator that provides personalized, categorized, and multi-sourced news.

## Features  

- Fetches news articles from the following APIs:  
  - *The New York Times*
  - *The Guardian*
  - *News.org*

- Search articles by keywords.  

- Filter articles by categories such as:  
  - Technology  
  - Business  
  - Sports  
  - Entertainment  
  - Science  
- Filter articles based on their source.  

- Users can save their preferences for:  
  - Categories of interest  
  - Preferred news sources  

- Modern, Responsive UI

---

## Build and Run

### 1. **Development**

Use the following command to build the development image, :

```bash
docker build --target development -t news-aggregator:dev .
```

To run the development server:

```bash
docker run -p 5173:5173 news-aggregator:dev
```

### 2. **Production**

Use the following command to build production image:

```bash
docker build --target production -t news-aggregator:prod .
```

Run the production app with Nginx:

```bash
docker run -p 80:80 news-aggregator:prod
```
---

## Screenshots

![image](https://github.com/user-attachments/assets/2a6c8541-ff88-4f54-b4b5-2fac13a13e28)


---

![image](https://github.com/user-attachments/assets/2fa1759c-b3a2-42dc-9b42-8a2cb2513386)


---

![image](https://github.com/user-attachments/assets/c81270e5-e69c-4b2e-b608-5228fc8d6cdf)


---

- Live URL: https://react-news-aggregator-one.vercel.app/
- >_Note: Due to API restrictions on the free Developer plans, both the NewsOrg and Guardian APIs only work on local environments. Browser-based requests are blocked in   production—these APIs allow requests only from localhost._

---
