import fs from 'fs';
import path from 'path';

const createDirectory = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const createFSDDirectories = () => {
  const targetPath = process.argv[2];

  if (!targetPath) {
    console.error('경로가 입력되지 않았습니다.');
    process.exit(1);
  }

  const baseDir = 'src';
  const targetDir = path.join(baseDir, targetPath);
  const pathWithoutApp = targetPath.slice(4);

  createDirectory(targetDir);

  const lastPart = path.basename(targetPath);
  let formattedName = lastPart.charAt(0).toUpperCase() + lastPart.slice(1);

  if (targetPath.startsWith('app/')) {
    formattedName = pathWithoutApp
      .split(/[^a-zA-Z0-9]+/)
      .filter((part) => part.length > 0)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join('');

    if (targetPath.startsWith('app/api/')) {
      const routeContent = `
import type { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    
  } catch (error) {
    console.log('🔥 [${formattedName}.ts] Error Message: ', error)
  }
};

export const POST = async (request: NextRequest) => {
  try {
    
  } catch (error) {
    console.log('🔥 [${formattedName}.ts] Error Message: ', error)
  }
};
      `;

      fs.writeFileSync(path.join(targetDir, 'route.ts'), routeContent);
      console.log(
        `${formattedName} Route Handler가 생성되었습니다. 🙋🏻 Server Action을 사용하는 것은 어떨까요?`,
      );
    } else {
      const isDynamicRoute = lastPart.startsWith('[') && lastPart.endsWith(']');
      let pageContent;

      if (isDynamicRoute) {
        const paramName = lastPart.slice(1, -1);
        pageContent = `
interface I${formattedName}PageProps {
  params: { ${paramName}: string; };
}

const ${formattedName}Page = ({
  params: { ${paramName} }
}: I${formattedName}PageProps) => {
  return <>${formattedName}</>;
};

export default ${formattedName}Page;
`;
      } else {
        pageContent = `
interface I${formattedName}PageProps {}

const ${formattedName}Page = ({}: I${formattedName}PageProps) => {
  return <>${formattedName}</>;
};

export default ${formattedName}Page;
`;
      }
      fs.writeFileSync(path.join(targetDir, 'page.tsx'), pageContent);
      console.log(`${formattedName} Page가 생성되었습니다.`);
    }
  } else if (targetPath.startsWith('widgets/')) {
    createDirectory(path.join(targetDir, 'ui'));
    fs.writeFileSync(path.join(targetDir, 'index.ts'), '');
    fs.writeFileSync(path.join(targetDir, 'ui', `${formattedName}.tsx`), '');
    console.log(`${formattedName} Widget이 생성되었습니다.`);
  } else {
    const subDirs: string[] = ['api', 'constant', 'lib', 'model'];
    if (targetPath === 'shared') {
      subDirs.push('config', 'type', 'ui');
    } else if (targetPath.startsWith('entities/')) {
      subDirs.push('type');
    }

    subDirs.forEach((subDir) => createDirectory(path.join(targetDir, subDir)));
    fs.writeFileSync(path.join(targetDir, 'model', `${lastPart}.ts`), '');
    fs.writeFileSync(path.join(targetDir, 'index.ts'), '');
    console.log(`${formattedName} Slice 생성이 완료되었습니다.`);
  }
};

createFSDDirectories();
