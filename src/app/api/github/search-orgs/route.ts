import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface GitHubOrg {
  id: number;
  login: string;
  description: string | null;
  avatar_url: string;
  html_url: string;
}

interface GitHubOrgDetails {
  login: string;
  name: string | null;
  description: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  created_at: string;
  blog: string | null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters' },
        { status: 400 }
      );
    }

    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

    // Search for organizations on GitHub
    const searchResponse = await fetch(
      `https://api.github.com/search/users?q=${encodeURIComponent(query)}+type:org&per_page=10`,
      {
        headers: {
          Authorization: token ? `token ${token}` : '',
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!searchResponse.ok) {
      throw new Error('Failed to search GitHub organizations');
    }

    const searchData = await searchResponse.json();
    const orgs: GitHubOrg[] = searchData.items || [];

    return NextResponse.json({
      results: orgs.map((org) => ({
        id: org.id,
        login: org.login,
        description: org.description,
        avatar_url: org.avatar_url,
        html_url: org.html_url,
      })),
      total: searchData.total_count,
    });
  } catch (error) {
    console.error('GitHub org search error:', error);
    return NextResponse.json(
      { error: 'Failed to search organizations' },
      { status: 500 }
    );
  }
}

// Get detailed info about a specific org
export async function POST(request: NextRequest) {
  try {
    const { orgName } = await request.json();

    if (!orgName) {
      return NextResponse.json(
        { error: 'Organization name is required' },
        { status: 400 }
      );
    }

    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

    const response = await fetch(
      `https://api.github.com/orgs/${orgName}`,
      {
        headers: {
          Authorization: token ? `token ${token}` : '',
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Organization not found' },
          { status: 404 }
        );
      }
      throw new Error('Failed to fetch organization details');
    }

    const data: GitHubOrgDetails = await response.json();

    return NextResponse.json({
      login: data.login,
      name: data.name,
      description: data.description,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      public_repos: data.public_repos,
      followers: data.followers,
      created_at: data.created_at,
      blog: data.blog,
    });
  } catch (error) {
    console.error('GitHub org details error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organization details' },
      { status: 500 }
    );
  }
}
