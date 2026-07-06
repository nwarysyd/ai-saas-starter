// Central registry for all AIForge apps
// This file defines the manifest structure and catalog of available apps

export const APP_CATEGORIES = {
  IMAGE: { id: 'image', name: 'Image Generation', slug: 'image', icon: '🖼️', color: '#ec4899' },
  VIDEO: { id: 'video', name: 'Video Generation', slug: 'video', icon: '🎬', color: '#f59e0b' },
  AUDIO: { id: 'audio', name: 'Audio & Music', slug: 'audio', icon: '🎵', color: '#8b5cf6' },
  UPSCALE: { id: 'upscale', name: 'Image Enhancement', slug: 'upscale', icon: '✨', color: '#06b6d4' },
  EDITING: { id: 'editing', name: 'Image Editing', slug: 'editing', icon: '✏️', color: '#10b981' },
  TEXT: { id: 'text', name: 'Text Generation', slug: 'text', icon: '📝', color: '#6366f1' },
  VOICE: { id: 'voice', name: 'Voice & Speech', slug: 'voice', icon: '🎤', color: '#ef4444' },
  DESIGN: { id: 'design', name: 'Design Tools', slug: 'design', icon: '🎨', color: '#f97316' },
};

// App manifest template structure
export const createAppManifest = (overrides) => ({
  // Basic Info
  id: '',
  name: '',
  slug: '',
  version: '1.0.0',
  author: 'AIForge',
  description: '',
  longDescription: '',
  icon: '🤖',
  banner: '',
  category: '',
  tags: [],
  
  // Pricing & Stats
  creditCost: 1,
  rating: 4.5,
  downloads: 0,
  featured: false,
  isPublic: true,
  
  // UI Configuration
  parameters: [], // Array of parameter definitions
  outputs: {
    type: 'image', // image, video, audio, text
    downloadFormat: 'png',
  },
  
  // API/Model Configuration
  model: '',
  apiProvider: '', // 'muapi', 'openai', 'anthropic', etc.
  
  // Example usage
  examplePrompt: '',
  exampleImage: '',
  
  ...overrides,
});

// Parameter definition helper
export const createParameter = (overrides) => ({
  id: '',
  name: '',
  type: 'text', // text, number, select, toggle, slider, image
  label: '',
  description: '',
  required: false,
  default: '',
  min: null,
  max: null,
  step: null,
  options: [], // For select type
  placeholder: '',
  ...overrides,
});

// Comprehensive app catalog with 20 premium apps
export const APP_CATALOG = {
  // IMAGE GENERATION - 5 apps
  'ai-portrait-studio': createAppManifest({
    id: 'ai-portrait-studio',
    name: 'AI Portrait Studio',
    slug: 'ai-portrait-studio',
    description: 'Create stunning AI-generated portraits in any style',
    longDescription: 'Transform your photos or descriptions into beautiful AI-generated portraits. Choose from photography, painting, illustration, and more artistic styles.',
    icon: '👤',
    category: 'image',
    creditCost: 2,
    rating: 4.8,
    downloads: 15230,
    featured: true,
    tags: ['portrait', 'photography', 'ai', 'headshot', 'professional'],
    parameters: [
      createParameter({ id: 'prompt', name: 'Description', type: 'text', label: 'Portrait Description', description: 'Describe the portrait you want to create', required: true, placeholder: 'A professional headshot of a woman with blue eyes, warm smile' }),
      createParameter({ id: 'style', name: 'Style', type: 'select', label: 'Artistic Style', required: true, options: ['Photography', 'Oil Painting', 'Watercolor', 'Digital Art', 'Pencil Sketch', 'Cartoon'] }),
      createParameter({ id: 'mood', name: 'Mood', type: 'select', label: 'Mood', options: ['Professional', 'Casual', 'Dramatic', 'Joyful', 'Serious'] }),
      createParameter({ id: 'aspect_ratio', name: 'Aspect Ratio', type: 'select', options: ['1:1', '4:3', '16:9', '9:16'], default: '1:1' }),
    ],
    examplePrompt: 'A professional headshot of a woman with blue eyes',
  }),

  'dreamscape-landscape': createAppManifest({
    id: 'dreamscape-landscape',
    name: 'Dreamscape Landscape',
    slug: 'dreamscape-landscape',
    description: 'Generate breathtaking AI landscapes and environments',
    longDescription: 'Create surreal, photorealistic, or fantastical landscapes. Perfect for wallpapers, concept art, and creative projects.',
    icon: '🏔️',
    category: 'image',
    creditCost: 2,
    rating: 4.7,
    downloads: 12450,
    featured: true,
    tags: ['landscape', 'nature', 'scenery', 'environment', 'concept'],
    parameters: [
      createParameter({ id: 'prompt', name: 'Scene Description', type: 'text', required: true, placeholder: 'A misty mountain valley with waterfalls at sunrise' }),
      createParameter({ id: 'style', name: 'Art Style', type: 'select', options: ['Photorealistic', 'Painting', 'Digital Art', 'Fantasy', 'Cinematic'] }),
      createParameter({ id: 'time_of_day', name: 'Time of Day', type: 'select', options: ['Sunrise', 'Day', 'Sunset', 'Night', 'Golden Hour'] }),
      createParameter({ id: 'resolution', name: 'Resolution', type: 'select', options: ['1024x1024', '1536x1024', '2048x1024'], default: '1024x1024' }),
    ],
  }),

  'product-showcase': createAppManifest({
    id: 'product-showcase',
    name: 'Product Showcase',
    slug: 'product-showcase',
    description: 'Generate product mockups and promotional images',
    longDescription: 'Create professional product images, 3D mockups, and promotional content for e-commerce and marketing.',
    icon: '🛍️',
    category: 'image',
    creditCost: 1,
    rating: 4.6,
    downloads: 8920,
    featured: false,
    tags: ['product', 'mockup', 'ecommerce', 'marketing', '3d'],
    parameters: [
      createParameter({ id: 'product_description', name: 'Product', type: 'text', required: true, placeholder: 'Luxury watch with leather strap' }),
      createParameter({ id: 'setting', name: 'Background', type: 'select', options: ['Studio', 'Lifestyle', 'Nature', 'Minimalist', 'Luxury'] }),
      createParameter({ id: 'angle', name: 'Angle', type: 'select', options: ['Front', 'Side', '3D View', 'Detail', 'Hero Shot'] }),
    ],
  }),

  'anime-character-gen': createAppManifest({
    id: 'anime-character-gen',
    name: 'Anime Character Generator',
    slug: 'anime-character-gen',
    description: 'Create unique anime and manga-style characters',
    longDescription: 'Generate original anime characters with customizable features, expressions, and clothing. Perfect for manga, games, and creative projects.',
    icon: '⛩️',
    category: 'image',
    creditCost: 1,
    rating: 4.9,
    downloads: 22100,
    featured: true,
    tags: ['anime', 'manga', 'character', 'illustration', 'kawaii'],
    parameters: [
      createParameter({ id: 'character_type', name: 'Character Type', type: 'select', required: true, options: ['Anime Girl', 'Anime Boy', 'Chibi', 'Magical Girl', 'Demon/Angel'] }),
      createParameter({ id: 'personality', name: 'Personality', type: 'select', options: ['Cute', 'Cool', 'Serious', 'Playful', 'Mysterious'] }),
      createParameter({ id: 'outfit', name: 'Outfit Style', type: 'select', options: ['School Uniform', 'Casual', 'Fantasy', 'Cyberpunk', 'Traditional'] }),
      createParameter({ id: 'expression', name: 'Expression', type: 'select', options: ['Smiling', 'Confident', 'Shy', 'Angry', 'Surprised'] }),
    ],
  }),

  'interior-design-ai': createAppManifest({
    id: 'interior-design-ai',
    name: 'Interior Design AI',
    slug: 'interior-design-ai',
    description: 'Redesign your spaces with AI-powered suggestions',
    longDescription: 'Upload a room photo and get AI-powered interior design suggestions and transformations. Perfect for home renovation planning.',
    icon: '🛋️',
    category: 'image',
    creditCost: 3,
    rating: 4.5,
    downloads: 6780,
    featured: false,
    tags: ['interior', 'design', 'home', 'renovation', 'deco'],
    parameters: [
      createParameter({ id: 'room_image', name: 'Room Photo', type: 'image', label: 'Upload room image', required: true }),
      createParameter({ id: 'style', name: 'Design Style', type: 'select', options: ['Modern', 'Minimalist', 'Luxury', 'Rustic', 'Eclectic'] }),
      createParameter({ id: 'budget', name: 'Budget Level', type: 'select', options: ['Budget', 'Mid-range', 'Premium', 'Luxury'] }),
    ],
  }),

  // VIDEO GENERATION - 3 apps
  'text-to-video': createAppManifest({
    id: 'text-to-video',
    name: 'Text-to-Video',
    slug: 'text-to-video',
    description: 'Create videos from text descriptions',
    longDescription: 'Generate short AI videos directly from text prompts. Create animations, transitions, and motion graphics automatically.',
    icon: '🎬',
    category: 'video',
    creditCost: 5,
    rating: 4.7,
    downloads: 9230,
    featured: true,
    tags: ['video', 'animation', 'motion', 'ai', 'generation'],
    parameters: [
      createParameter({ id: 'prompt', name: 'Video Description', type: 'text', required: true, placeholder: 'A drone flying over a beautiful mountain valley at sunset' }),
      createParameter({ id: 'duration', name: 'Duration', type: 'select', options: ['5 seconds', '10 seconds', '15 seconds', '30 seconds'] }),
      createParameter({ id: 'style', name: 'Style', type: 'select', options: ['Cinematic', 'Cartoon', 'Anime', 'Real', 'Abstract'] }),
    ],
  }),

  'video-upscaler': createAppManifest({
    id: 'video-upscaler',
    name: 'Video Upscaler Pro',
    slug: 'video-upscaler',
    description: 'Enhance video quality and resolution',
    longDescription: 'Upscale your videos to 4K or 8K resolution with AI enhancement. Improve clarity, detail, and overall quality.',
    icon: '📹',
    category: 'video',
    creditCost: 4,
    rating: 4.6,
    downloads: 5430,
    featured: false,
    tags: ['video', 'upscale', 'enhancement', 'resolution', '4k'],
    parameters: [
      createParameter({ id: 'video_file', name: 'Video File', type: 'image', required: true }),
      createParameter({ id: 'target_resolution', name: 'Target Resolution', type: 'select', options: ['1080p', '2K', '4K', '8K'] }),
      createParameter({ id: 'enhancement', name: 'Enhancement Level', type: 'slider', min: 0, max: 100, default: 50 }),
    ],
  }),

  'background-remover-video': createAppManifest({
    id: 'background-remover-video',
    name: 'Video Background Remover',
    slug: 'background-remover-video',
    description: 'Remove backgrounds from videos automatically',
    longDescription: 'Remove backgrounds from video content with pixel-perfect precision. Perfect for green screen replacement and compositing.',
    icon: '🎥',
    category: 'video',
    creditCost: 3,
    rating: 4.5,
    downloads: 3210,
    featured: false,
    tags: ['video', 'background', 'removal', 'compositing'],
    parameters: [
      createParameter({ id: 'video_file', name: 'Video File', type: 'image', required: true }),
      createParameter({ id: 'subject', name: 'Keep Subject', type: 'select', options: ['Person', 'Object', 'All except background'] }),
      createParameter({ id: 'feather', name: 'Edge Feather', type: 'slider', min: 0, max: 50, default: 10 }),
    ],
  }),

  // UPSCALE & ENHANCEMENT - 3 apps
  'image-upscaler-pro': createAppManifest({
    id: 'image-upscaler-pro',
    name: 'Image Upscaler Pro',
    slug: 'image-upscaler-pro',
    description: 'Enlarge images without quality loss',
    longDescription: 'Upscale images up to 16x with AI-powered enhancement. Perfect for old photos, low-res images, and prints.',
    icon: '⬆️',
    category: 'upscale',
    creditCost: 2,
    rating: 4.8,
    downloads: 18900,
    featured: true,
    tags: ['upscale', 'enhancement', 'resolution', 'restoration'],
    parameters: [
      createParameter({ id: 'image', name: 'Image', type: 'image', required: true }),
      createParameter({ id: 'scale', name: 'Scale Factor', type: 'select', options: ['2x', '4x', '8x', '16x'], default: '4x' }),
      createParameter({ id: 'enhancement_mode', name: 'Mode', type: 'select', options: ['General', 'Face', 'Anime', 'Art'] }),
    ],
  }),

  'face-enhancer': createAppManifest({
    id: 'face-enhancer',
    name: 'Face Enhancer',
    slug: 'face-enhancer',
    description: 'Beautify and enhance faces in photos',
    longDescription: 'AI-powered face enhancement with skin smoothing, brightness adjustment, and facial feature refinement.',
    icon: '✨',
    category: 'upscale',
    creditCost: 1,
    rating: 4.9,
    downloads: 25600,
    featured: true,
    tags: ['face', 'enhancement', 'beauty', 'photo', 'portrait'],
    parameters: [
      createParameter({ id: 'image', name: 'Photo', type: 'image', required: true }),
      createParameter({ id: 'enhancement_level', name: 'Enhancement Level', type: 'slider', min: 0, max: 100, default: 50 }),
      createParameter({ id: 'skin_smoothing', name: 'Skin Smoothing', type: 'toggle', default: true }),
      createParameter({ id: 'brightness', name: 'Brightness', type: 'slider', min: -50, max: 50, default: 0 }),
    ],
  }),

  'color-correction': createAppManifest({
    id: 'color-correction',
    name: 'Color Correction Master',
    slug: 'color-correction',
    description: 'Professional color correction and grading',
    longDescription: 'Fix color balance, white balance, and apply cinematic color grading to your photos.',
    icon: '🎨',
    category: 'upscale',
    creditCost: 1,
    rating: 4.6,
    downloads: 7850,
    featured: false,
    tags: ['color', 'correction', 'grading', 'photo', 'editing'],
    parameters: [
      createParameter({ id: 'image', name: 'Image', type: 'image', required: true }),
      createParameter({ id: 'preset', name: 'Color Grade', type: 'select', options: ['Warm', 'Cool', 'Cinematic', 'Vibrant', 'Vintage'] }),
      createParameter({ id: 'saturation', name: 'Saturation', type: 'slider', min: -100, max: 100, default: 0 }),
      createParameter({ id: 'contrast', name: 'Contrast', type: 'slider', min: -50, max: 50, default: 0 }),
    ],
  }),

  // AUDIO & VOICE - 3 apps
  'text-to-speech': createAppManifest({
    id: 'text-to-speech',
    name: 'Text-to-Speech Pro',
    slug: 'text-to-speech',
    description: 'Convert text to natural-sounding speech',
    longDescription: 'Create realistic voiceovers with multiple voices, accents, and languages. Perfect for videos, podcasts, and audiobooks.',
    icon: '🎤',
    category: 'voice',
    creditCost: 1,
    rating: 4.7,
    downloads: 14320,
    featured: true,
    tags: ['voice', 'speech', 'tts', 'narration', 'audio'],
    parameters: [
      createParameter({ id: 'text', name: 'Text', type: 'text', required: true, placeholder: 'Enter text to convert to speech' }),
      createParameter({ id: 'voice', name: 'Voice', type: 'select', required: true, options: ['Emma (Female)', 'James (Male)', 'Sofia (Female)', 'Marcus (Male)'] }),
      createParameter({ id: 'language', name: 'Language', type: 'select', options: ['English', 'Spanish', 'French', 'German', 'Japanese'] }),
      createParameter({ id: 'speed', name: 'Speed', type: 'slider', min: 0.5, max: 2, step: 0.1, default: 1 }),
    ],
  }),

  'music-generator': createAppManifest({
    id: 'music-generator',
    name: 'AI Music Generator',
    slug: 'music-generator',
    description: 'Generate original background music and soundtracks',
    longDescription: 'Create royalty-free background music for videos, podcasts, and projects. Multiple genres and moods available.',
    icon: '🎵',
    category: 'audio',
    creditCost: 3,
    rating: 4.5,
    downloads: 9120,
    featured: false,
    tags: ['music', 'audio', 'soundtrack', 'generation', 'royalty-free'],
    parameters: [
      createParameter({ id: 'mood', name: 'Mood', type: 'select', required: true, options: ['Uplifting', 'Calm', 'Dramatic', 'Playful', 'Dark'] }),
      createParameter({ id: 'genre', name: 'Genre', type: 'select', options: ['Ambient', 'Electronic', 'Orchestral', 'Jazz', 'Pop', 'Lo-fi'] }),
      createParameter({ id: 'duration', name: 'Duration', type: 'select', options: ['30 seconds', '1 minute', '3 minutes', '5 minutes'] }),
      createParameter({ id: 'intensity', name: 'Intensity', type: 'slider', min: 0, max: 100, default: 50 }),
    ],
  }),

  'voice-cloner': createAppManifest({
    id: 'voice-cloner',
    name: 'Voice Cloner',
    slug: 'voice-cloner',
    description: 'Clone any voice with AI precision',
    longDescription: 'Create a digital clone of any voice for realistic TTS generation. Train on voice samples and generate new speech.',
    icon: '🗣️',
    category: 'voice',
    creditCost: 5,
    rating: 4.4,
    downloads: 4320,
    featured: false,
    tags: ['voice', 'clone', 'tts', 'speech', 'synthesis'],
    parameters: [
      createParameter({ id: 'voice_samples', name: 'Voice Samples', type: 'image', label: 'Upload audio files', required: true }),
      createParameter({ id: 'text', name: 'Text to Speak', type: 'text', required: true }),
      createParameter({ id: 'tone', name: 'Tone', type: 'select', options: ['Neutral', 'Happy', 'Sad', 'Angry', 'Excited'] }),
    ],
  }),

  // IMAGE EDITING - 2 apps
  'background-remover': createAppManifest({
    id: 'background-remover',
    name: 'Background Remover',
    slug: 'background-remover',
    description: 'Remove backgrounds from images instantly',
    longDescription: 'One-click background removal with pixel-perfect edge detection. Perfect for product photos and portraits.',
    icon: '✂️',
    category: 'editing',
    creditCost: 1,
    rating: 4.9,
    downloads: 28450,
    featured: true,
    tags: ['background', 'removal', 'transparency', 'editing'],
    parameters: [
      createParameter({ id: 'image', name: 'Image', type: 'image', required: true }),
      createParameter({ id: 'subject_type', name: 'Subject Type', type: 'select', options: ['Person', 'Product', 'Animal', 'Auto-detect'], default: 'Auto-detect' }),
      createParameter({ id: 'edge_refinement', name: 'Edge Quality', type: 'select', options: ['Fast', 'Balanced', 'High Quality'] }),
    ],
  }),

  'object-remover': createAppManifest({
    id: 'object-remover',
    name: 'Object Remover',
    slug: 'object-remover',
    description: 'Remove unwanted objects from images',
    longDescription: 'Intelligently remove objects, watermarks, and blemishes using AI inpainting. Perfect for cleaning up photos.',
    icon: '🗑️',
    category: 'editing',
    creditCost: 2,
    rating: 4.6,
    downloads: 11200,
    featured: false,
    tags: ['removal', 'inpainting', 'editing', 'cleanup'],
    parameters: [
      createParameter({ id: 'image', name: 'Image', type: 'image', required: true }),
      createParameter({ id: 'selection_method', name: 'Selection', type: 'select', options: ['Auto', 'Manual brush', 'Object detection'] }),
      createParameter({ id: 'blend_mode', name: 'Blend Mode', type: 'select', options: ['Natural', 'Smooth', 'Preserve texture'] }),
    ],
  }),

  // TEXT GENERATION - 1 app
  'ai-content-writer': createAppManifest({
    id: 'ai-content-writer',
    name: 'AI Content Writer',
    slug: 'ai-content-writer',
    description: 'Generate high-quality written content',
    longDescription: 'Create blog posts, social media content, product descriptions, and more using advanced AI language models.',
    icon: '✍️',
    category: 'text',
    creditCost: 1,
    rating: 4.7,
    downloads: 16780,
    featured: true,
    tags: ['writing', 'content', 'ai', 'generation', 'copywriting'],
    parameters: [
      createParameter({ id: 'topic', name: 'Topic', type: 'text', required: true, placeholder: 'What do you want to write about?' }),
      createParameter({ id: 'content_type', name: 'Content Type', type: 'select', options: ['Blog Post', 'Social Media', 'Product Description', 'Email', 'Article'] }),
      createParameter({ id: 'tone', name: 'Tone', type: 'select', options: ['Professional', 'Casual', 'Playful', 'Formal', 'Persuasive'] }),
      createParameter({ id: 'length', name: 'Length', type: 'select', options: ['Short (100 words)', 'Medium (300 words)', 'Long (500+ words)'] }),
    ],
  }),

  // DESIGN TOOLS - 1 app
  'logo-generator': createAppManifest({
    id: 'logo-generator',
    name: 'AI Logo Generator',
    slug: 'logo-generator',
    description: 'Create professional logos instantly',
    longDescription: 'Generate unique, professional logos for your brand. Unlimited variations and full customization.',
    icon: '🎭',
    category: 'design',
    creditCost: 2,
    rating: 4.8,
    downloads: 13450,
    featured: true,
    tags: ['logo', 'design', 'branding', 'generator'],
    parameters: [
      createParameter({ id: 'company_name', name: 'Company Name', type: 'text', required: true }),
      createParameter({ id: 'industry', name: 'Industry', type: 'select', options: ['Technology', 'Fashion', 'Food', 'Finance', 'Creative', 'Other'] }),
      createParameter({ id: 'style', name: 'Logo Style', type: 'select', options: ['Modern', 'Classic', 'Minimalist', 'Playful', 'Luxury'] }),
      createParameter({ id: 'colors', name: 'Color Preference', type: 'select', options: ['Monochrome', 'Colorful', 'Pastel', 'Bold', 'Multi-color'] }),
    ],
  }),
};

export default APP_CATALOG;
