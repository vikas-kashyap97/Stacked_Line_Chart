# Stacked Line Chart for Population and Demographic Data

## Overview
This project is a React-based web application that visualizes population and demographic data using an interactive chart with **ECharts**. The data covers key demographic indicators such as total population, growth rate, population density, urbanization, fertility rate, sex ratio, and age distribution from 2000 to 2024. The application is responsive and adjusts to different screen sizes, offering an engaging experience on both desktop and mobile devices.

## Live Demo
You can view the live demo of this project [here](https://apache-echart.netlify.app/).

## Preview
![Project Preview](https://app.netlify.com/.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/673cba3d45eeed08b750b9b6/screenshot_2024-11-19-16-18-09-0000.webp&fit=cover&h=500&q=40&w=800)

## Project Features
- **Responsive Design**: The chart and table resize according to screen dimensions.
- **Interactive Chart**: A line chart displaying data trends over time with tooltips and detailed labels.
- **Data Table**: A scrollable table providing detailed information corresponding to the chart data.
- **Chart Customization**: Built using **ECharts** library for robust data visualization.
- **Cross-Browser Support**: Designed to work on various browsers and devices.

## Tech Stack
- **React**: JavaScript library for building user interfaces.
- **ECharts**: Powerful and flexible charting library.
- **Vite**: Build tool for fast development and optimized production builds.
- **ESLint**: Linting tool to maintain code quality.

## Installation and Setup
### Prerequisites
Ensure that Node.js and npm are installed on your machine.

### Step-by-step Guide
1. **Clone the repository**:
    ```bash
    git clone https://github.com/vikas-kashyap97/Stacked_Line_Chart.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd Stacked_Line_Chart
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Run the development server**:
    ```bash
    npm run dev
    ```
   Visit `http://localhost:3000` in your browser to view the app.

5. **Build the project for production**:
    ```bash
    npm run build
    ```

6. **Preview the production build**:
    ```bash
    npm run preview
    ```

## Project Structure
- **`/src`**: Contains the main React components and logic.
- **`/public`**: Static assets and public-facing files.
- **`/node_modules`**: Project dependencies.
- **`package.json`**: Project configuration, scripts, and dependencies.
- **`vite.config.js`**: Vite configuration for development and build.

## Code Overview
### Key Components:
- **App Component**: Main component that initializes the ECharts chart and manages responsiveness.
- **ResponsiveTable Component**: A component that displays the dataset in a table format for easier data inspection.

### Code Highlights:
- **Responsive Chart Initialization**: Adjusts the chart's size and properties based on screen width using `window.innerWidth`.
- **Dynamic Chart Configuration**: The chart adapts its labels and options to be more readable on smaller screens.

### Sample Code:
```jsx
useEffect(() => {
  const myChart = echarts.init(document.getElementById('mainChart'));
  // ECharts series setup and option configuration
  myChart.setOption(option);
  // Event listeners and cleanup
  window.addEventListener('resize', resizeChart);
  return () => {
    window.removeEventListener('resize', resizeChart);
    myChart.dispose();
  };
}, [isSmallScreen]);
